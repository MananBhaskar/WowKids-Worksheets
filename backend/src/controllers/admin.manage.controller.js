const Grade = require('../models/grade.model');
const Subject = require('../models/subject.model');
const Worksheet = require('../models/worksheet.model');
const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const { cloudinary } = require('../services/cloudinary');
const APIResponse = require('../utils/APIResponse');
const {drive} = require('../services/googleDriveOauth')
function makeSlug(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD') 
    .replace(/[\u0300-\u036F]/g, '') 
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') 
    .replace(/-{2,}/g, '-'); 
}

async function generateUniqueSlug(model, base, filter = {}) {
  let slug = makeSlug(base);
  if (!slug) slug = `item-${Date.now()}`;

  // if no conflict, return
  const exists = await model.findOne({ ...filter, slug });
  if (!exists) return slug;

  // otherwise append counter
  let counter = 1;
  while (true) {
    const candidate = `${slug}-${counter}`;
    // eslint-disable-next-line no-await-in-loop
    const found = await model.findOne({ ...filter, slug: candidate });
    if (!found) return candidate;
    counter += 1;
  }
}


// POST /api/v1/admin/grades
// body: { name, slug, order }

exports.createGrade = async (req, res, next) => {
  try {
    const { name, order } = req.body;
    if (!name) return next(new APIError(400, 'name is required'));

    // Determine base slug: prefer provided (but sanitized), else use name
    const finalSlug = await generateUniqueSlug(Grade, name);

    const grade = new Grade({ name, slug: finalSlug, order: order || 0 });
    await grade.save();
    return res.status(201).json(new APIResponse(201, grade, 'Grade created'));
  } catch (err) {
    console.error('createGrade error:', err);
    next(err);
  }
};

//  POST /api/v1/admin/grades/:gradeId/subjects
//  body: { name, slug, order }
exports.createSubject = async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    const { name, order } = req.body;

    if (!mongoose.Types.ObjectId.isValid(gradeId)) return next(new APIError(400, 'Invalid gradeId'));
    if (!name) return next(new APIError(400, 'name is required'));

    // ensure grade exists
    const grade = await Grade.findById(gradeId);
    if (!grade) return next(new APIError(404, 'Grade not found'));

    // generate slug unique within this grade
    const finalSlug = await generateUniqueSlug(Subject, name, { grade: gradeId });

    const subject = new Subject({ grade: gradeId, name, slug: finalSlug, order: order || 0 });
    await subject.save();
    return res.status(201).json(new APIResponse(201, subject, 'Subject created'));
  } catch (err) {
    console.error('createSubject error:', err);
    next(err);
  }
};

// GET /api/v1/admin/grades (public listing)

exports.listGrades = async (req, res, next) => {
  try {
    const grades = await Grade.find({}).sort({ order: 1, name: 1 });
    return res.json(new APIResponse(200, grades, 'Grades fetched'));
  } catch (err) {
    console.error('listGrades error:', err);
    next(err);
  }
};

//  GET /api/v1/admin/grades/:gradeId/subjects (public listing)
exports.listSubjectsForGrade = async (req, res, next) => {
  try {
    const { gradeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gradeId)) {
      return next(new APIError(400, 'Invalid gradeId'));
    }

    const subjects = await Subject.find({ grade: gradeId })
      .populate('grade') 
      .sort({ order: 1, name: 1 });

    return res.json(new APIResponse(200, subjects, 'Subjects fetched'));
  } catch (err) {
    console.error('listSubjectsForGrade error:', err);
    next(err);
  }
};

// DELETE /api/v1/admin/grades/:gradeId
exports.deleteGrade = async (req, res, next) => {
  try {
    const { gradeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gradeId)) {
      return next(new APIError(400, 'Invalid gradeId'));
    }

    const grade = await Grade.findById(gradeId);
    if (!grade) return next(new APIError(404, 'Grade not found'));

    const subjects = await Subject.find({ grade: gradeId }).select('_id');
    const subjectIds = subjects.map(s => s._id);

    const worksheets = await Worksheet.find({ grade: gradeId }).select(
      '_id driveFileId thumbnailPublicId'
    );

    if (worksheets.length > 0) {
      const deletions = worksheets.map(ws => {
        const ops = [];

        if (drive) {
          ops.push(
            drive.files.delete({ fileId: ws.driveFileId }).catch(err => {
              console.warn(
                'Drive delete failed for worksheet',
                ws._id.toString(),
                '-',
                err.message || err
              );
            })
          );
        } else {
          console.warn(
            'Drive client not configured; skipping Drive delete for worksheet',
            ws._id.toString()
          );
        }

        if (cloudinary && ws.thumbnailPublicId) {
          ops.push(
            cloudinary.uploader
              .destroy(ws.thumbnailPublicId, { resource_type: 'image' })
              .catch(err => {
                console.warn(
                  'Cloudinary delete failed for worksheet',
                  ws._id.toString(),
                  '-',
                  err.message || err
                );
              })
          );
        }

        return Promise.allSettled(ops);
      });

      await Promise.allSettled(deletions);
    }

    const wsResult = await Worksheet.deleteMany({ grade: gradeId });
    const subjResult = await Subject.deleteMany({ grade: gradeId });
    await grade.deleteOne();
    return res.json(
      new APIResponse(
        200,
        {
          gradeId,
          deletedWorksheets: wsResult.deletedCount || 0,
          deletedSubjects: subjResult.deletedCount || 0
        },
        'Grade and related subjects & worksheets deleted'
      )
    );
  } catch (err) {
    console.error('deleteGrade error:', err);
    next(err);
  }
};

//  DELETE /api/v1/admin/subjects/:subjectId
exports.deleteSubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return next(new APIError(400, 'Invalid subjectId'));
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) return next(new APIError(404, 'Subject not found'));

    const worksheets = await Worksheet.find({ subject: subjectId }).select(
      '_id driveFileId thumbnailPublicId'
    );

    if (worksheets.length > 0) {
      const deletions = worksheets.map(ws => {
        const ops = [];

        if (drive) {
          ops.push(
            drive.files.delete({ fileId: ws.driveFileId }).catch(err => {
              console.warn(
                'Drive delete failed for worksheet',
                ws._id.toString(),
                '-',
                err.message || err
              );
            })
          );
        } else {
          console.warn(
            'Drive client not configured; skipping Drive delete for worksheet',
            ws._id.toString()
          );
        }

        // Delete thumbnail from Cloudinary
        if (cloudinary && ws.thumbnailPublicId) {
          ops.push(
            cloudinary.uploader
              .destroy(ws.thumbnailPublicId, { resource_type: 'image' })
              .catch(err => {
                console.warn(
                  'Cloudinary delete failed for worksheet',
                  ws._id.toString(),
                  '-',
                  err.message || err
                );
              })
          );
        }

        return Promise.allSettled(ops);
      });

      await Promise.allSettled(deletions);
    }

    const wsResult = await Worksheet.deleteMany({ subject: subjectId });

    await subject.deleteOne();

    return res.json(
      new APIResponse(
        200,
        {
          subjectId,
          deletedWorksheets: wsResult.deletedCount || 0
        },
        'Subject and related worksheets deleted'
      )
    );
  } catch (err) {
    console.error('deleteSubject error:', err);
    next(err);
  }
};
