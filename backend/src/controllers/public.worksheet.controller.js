const Worksheet = require('../models/worksheet.model');
const APIError = require('../utils/APIError');
const APIResponse = require('../utils/APIResponse');


let driveClient;
try {
  const oauthSvc = require('../services/googleDriveOauth');
  driveClient = oauthSvc && oauthSvc.drive ? oauthSvc.drive : null;
} catch (e) {
  throw new APIError(500, "Something is wrong with google drive storage")
}

if (!driveClient) {
  console.warn('No Google Drive client found. Make sure services/googleDriveOauth.js or services/googleDrive.js exists.');
}


//   Helper: stream file from Drive to express response.
//   Supports Range header (progressive requests).
 
async function streamFromDriveToResponse(fileId, req, res, filename, asAttachment = false) {
  if (!driveClient) throw new APIError(500, 'Storage client not configured');

  const range = req.headers.range;
  const requestParams = { fileId, alt: 'media' };
  const getOptions = { responseType: 'stream' };

  // If there is a Range header, forward it in request options (googleapis accepts headers on second arg)
  if (range) getOptions.headers = { Range: range };

  // First fetch metadata so we can set the Content-Type and optionally Content-Length
  let meta;
  try {
    meta = await driveClient.files.get({ fileId, fields: 'name, mimeType, size' });
  } catch (err) {
    throw new APIError(404, 'File metadata not found or access denied');
  }

  const mimeType = (meta && meta.data && meta.data.mimeType) || 'application/pdf';
  const safeName = filename || (meta && meta.data && meta.data.name) || 'worksheet.pdf';
  res.setHeader('Content-Type', mimeType);

  const dispositionType = asAttachment ? 'attachment' : 'inline';
  res.setHeader('Content-Disposition', `${dispositionType}; filename="${safeName}"`);
  res.setHeader('Accept-Ranges', 'bytes');

  try {
    const driveRes = await driveClient.files.get(requestParams, getOptions);
    
    if (driveRes && driveRes.headers) {
      if (driveRes.headers['content-range']) {
        res.setHeader('Content-Range', driveRes.headers['content-range']);
        if (range) res.status(206);
      }
      if (driveRes.headers['content-length']) {
        res.setHeader('Content-Length', driveRes.headers['content-length']);
      }
    }

    driveRes.data.on('error', (err) => {
      console.error('Drive stream error:', err);
      if (!res.headersSent) res.status(500).end('Error streaming file');
      else res.end();
    });

    driveRes.data.pipe(res);
  } catch (err) {
    console.error('Error fetching file from Drive:', err && err.message ? err.message : err);
    throw new APIError(500, 'Error fetching file from storage');
  }
}

// List worksheets for a specific grade+subject with pagination (page size fixed to 25)
exports.listWorksheetsByGradeSubject = async (req, res, next) => {
  try {
    const { gradeId, subjectId } = req.params;
   
    // Validate ids
    if (!gradeId || !subjectId) {
      return next(new APIError(400, 'gradeId and subjectId are required in the URL'));
    }
    if (!require('mongoose').Types.ObjectId.isValid(gradeId)) {
      return next(new APIError(400, 'Invalid gradeId'));
    }
    if (!require('mongoose').Types.ObjectId.isValid(subjectId)) {
      return next(new APIError(400, 'Invalid subjectId'));
    }

    // Ensure grade exists
    const Grade = require('../models/grade.model');
    const Subject = require('../models/subject.model');
    const Worksheet = require('../models/worksheet.model');

    const grade = await Grade.findById(gradeId);
    if (!grade) return next(new APIError(404, 'Grade not found'));

    // Ensure subject exists and belongs to the grade
    const subject = await Subject.findById(subjectId);
    if (!subject) return next(new APIError(404, 'Subject not found'));
    if (String(subject.grade) !== String(grade._id)) {
      return next(new APIError(400, 'Subject does not belong to the specified grade'));
    }

    // Filter for published worksheets that match grade & subject
    const filter = { published: true, grade: gradeId, subject: subjectId };


    const [items, total] = await Promise.all([
      Worksheet.find(filter)
        .select('_id title fileName driveFileId category createdAt')
        .populate('grade', 'name slug')
        .populate('subject', 'name slug')
        .sort({ createdAt: -1 }),
      Worksheet.countDocuments(filter)
    ]);

   

    return res.json(new APIResponse(200, items, 'Worksheets fetched for grade & subject'));
  } catch (err) {
    console.error('listWorksheetsByGradeSubject error:', err);
    next(err);
  }
};


exports.getWorksheetDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ws = await Worksheet.findById(id).populate('grade subject');
    if (!ws || !ws.published) return next(new APIError(404, 'Worksheet not found'));
    return res.json(new APIResponse(200, ws, 'Worksheet details fetched'));
  } catch (err) {
    next(err);
  }
};

exports.previewWorksheet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ws = await Worksheet.findById(id);
    if (!ws || !ws.published) return next(new APIError(404, 'Worksheet not found'));

    await streamFromDriveToResponse(ws.driveFileId, req, res, ws.fileName, false);
    // note: streamFromDriveToResponse pipes the response and ends it
  } catch (err) {
    next(err);
  }
};

exports.downloadWorksheet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ws = await Worksheet.findById(id);
    if (!ws || !ws.published) return next(new APIError(404, 'Worksheet not found'));

    await streamFromDriveToResponse(ws.driveFileId, req, res, ws.fileName, true);
  } catch (err) {
    next(err);
  }
};
