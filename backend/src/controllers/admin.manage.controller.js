const Grade = require('../models/grade.model');
const Subject = require('../models/subject.model');
const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const APIResponse = require('../utils/APIResponse');



function makeSlug(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD') // normalize accents
    .replace(/[\u0300-\u036F]/g, '') // remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // non-alnum -> hyphen
    .replace(/^-+|-+$/g, '') // trim
    .replace(/-{2,}/g, '-'); // collapse
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
      .populate('grade') // ⬅️ added this
      .sort({ order: 1, name: 1 });

    return res.json(new APIResponse(200, subjects, 'Subjects fetched'));
  } catch (err) {
    console.error('listSubjectsForGrade error:', err);
    next(err);
  }
};
