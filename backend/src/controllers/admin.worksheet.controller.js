const stream = require('stream');
const mongoose = require('mongoose');
const Worksheet = require('../models/worksheet.model');
const Grade = require('../models/grade.model');
const Subject = require('../models/subject.model');
const APIError = require('../utils/APIError');
const APIResponse = require('../utils/APIResponse');
const { drive } = (() => {
  try { return require('../services/googleDriveOauth'); } catch (e) { try { return require('../services/googleDrive'); } catch (e2) { return {}; } }
})();

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

async function uploadBufferToDrive(buffer, filename, mimeType) {
  if (!FOLDER_ID) throw new APIError(500, 'Drive folder not configured (GOOGLE_DRIVE_FOLDER_ID)');
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  try {
    const res = await drive.drive.files.create({
      requestBody: {
        name: filename,
        parents: [FOLDER_ID]
      },
      media: {
        mimeType,
        body: bufferStream
      },
      fields: 'id,name,mimeType,size'
    });
    return res.data;
  } catch (err) {
    console.error('Drive upload error:', err && err.errors ? err.errors : err);
    throw new APIError(500, 'Failed to upload file to Drive');
  }
}

exports.uploadWorksheet = async (req, res, next) => {
  try {
    const { title, gradeId, subjectId, category } = req.body;
    const file = req.file;

    // Basic presence checks
    if (!title || !gradeId || !subjectId) {
      return next(new APIError(400, 'title, gradeId and subjectId are required'));
    }
    if (!file) return next(new APIError(400, 'PDF file is required'));

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(gradeId)) return next(new APIError(400, 'Invalid gradeId'));
    if (!mongoose.Types.ObjectId.isValid(subjectId)) return next(new APIError(400, 'Invalid subjectId'));

    // Verify the Grade and Subject exist
    const grade = await Grade.findById(gradeId);
    if (!grade) return next(new APIError(404, 'Grade not found'));

    const subject = await Subject.findById(subjectId);
    if (!subject) return next(new APIError(404, 'Subject not found'));

    // Only allow PDF
    if (!file.mimetype || !file.mimetype.includes('pdf')) {
      return next(new APIError(400, 'Only PDF files are allowed'));
    }

    // Upload to Drive
    const uploaded = await uploadBufferToDrive(file.buffer, file.originalname, file.mimetype);

    const ws = new Worksheet({
      title,
      description: req.body.description || '',
      grade: grade._id,
      subject: subject._id,
      category: category || '',
      driveFileId: uploaded.id,
      mimeType: uploaded.mimeType,
      fileName: uploaded.name,
      size: uploaded.size
    });

    await ws.save();

    return res.status(201).json(new APIResponse(201, ws, 'Worksheet uploaded successfully'));
  } catch (err) {
    console.error('uploadWorksheet error:', err);
    next(err);
  }
};

exports.deleteWorksheet = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(new APIError(400, 'Invalid worksheet id'));

    const ws = await Worksheet.findById(id);
    if (!ws) return next(new APIError(404, 'Worksheet not found'));

    // delete from Drive if possible
    try {
      await drive.drive.files.delete({ fileId: ws.driveFileId });
    } catch (e) {
      console.warn('Drive delete failed (non-fatal):', e && e.errors ? e.errors : e.message || e);
    }

    await ws.remove();
    return res.json(new APIResponse(200, null, 'Worksheet deleted'));
  } catch (err) {
    console.error('deleteWorksheet error:', err);
    next(err);
  }
};
