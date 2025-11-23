const stream = require('stream');
const mongoose = require('mongoose');
const Worksheet = require('../models/worksheet.model');
const Grade = require('../models/grade.model');
const Subject = require('../models/subject.model');
const APIError = require('../utils/APIError');
const APIResponse = require('../utils/APIResponse');
const { cloudinary } = require('../services/cloudinary');

const driveModule = require('../services/googleDriveOauth');

const drive = driveModule && driveModule.drive ? driveModule.drive : null;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// Upload PDF buffer to Google Drive
async function uploadBufferToDrive(buffer, filename, mimeType) {
  if (!FOLDER_ID) throw new APIError(500, 'Drive folder not configured (GOOGLE_DRIVE_FOLDER_ID)');
  if (!drive) {
    console.error('Drive client not configured.');
    throw new APIError(500, 'Storage client not configured');
  }

  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  try {
    const res = await drive.files.create({
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

// Upload thumbnail buffer to Cloudinary
async function uploadThumbnailToCloudinary(buffer, filename) {
  if (!cloudinary) {
    console.warn('Cloudinary not configured; skipping thumbnail upload.');
    return null;
  }

  const folder = process.env.CLOUDINARY_FOLDER || 'wowkids_thumbnails';

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        public_id: filename?.split('.').slice(0, -1).join('.') || undefined
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(new APIError(500, 'Failed to upload thumbnail'));
        }
        resolve(result);
      }
    );

    const thumbStream = new stream.PassThrough();
    thumbStream.end(buffer);
    thumbStream.pipe(uploadStream);
  });
}

exports.uploadWorksheet = async (req, res, next) => {
  try {
    const { title, gradeId, subjectId, category } = req.body;

    // files from multer.fields
    const pdfFile = req.files?.file?.[0];
    const thumbFile = req.files?.thumbnail?.[0];

    // Basic presence checks
    if (!title || !gradeId || !subjectId) {
      return next(new APIError(400, 'title, gradeId and subjectId are required'));
    }
    if (!pdfFile) return next(new APIError(400, 'PDF file is required'));
    if (!thumbFile) return next(new APIError(400, 'Thumbnail image is required'));

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(gradeId)) return next(new APIError(400, 'Invalid gradeId'));
    if (!mongoose.Types.ObjectId.isValid(subjectId)) return next(new APIError(400, 'Invalid subjectId'));

    // Verify the Grade and Subject exist
    const grade = await Grade.findById(gradeId);
    if (!grade) return next(new APIError(404, 'Grade not found'));

    const subject = await Subject.findById(subjectId);
    if (!subject) return next(new APIError(404, 'Subject not found'));

    // Only allow PDF for main file
    if (!pdfFile.mimetype || !pdfFile.mimetype.includes('pdf')) {
      return next(new APIError(400, 'Only PDF files are allowed for worksheet file'));
    }

    // Upload main PDF to Drive
    const uploadedPdf = await uploadBufferToDrive(pdfFile.buffer, pdfFile.originalname, pdfFile.mimetype);

    // Optional: upload thumbnail if provided
    let thumbnailUrl = '';
    let thumbnailPublicId = '';

    if (thumbFile) {
      if (!thumbFile.mimetype.startsWith('image/')) {
        return next(new APIError(400, 'Thumbnail must be an image'));
      }

      const thumbResult = await uploadThumbnailToCloudinary(thumbFile.buffer, thumbFile.originalname);
      if (thumbResult) {
        thumbnailUrl = thumbResult.secure_url;
        thumbnailPublicId = thumbResult.public_id;
      }
    }

    const ws = new Worksheet({
      title,
      description: req.body.description || '',
      grade: grade._id,
      subject: subject._id,
      category: category || '',
      driveFileId: uploadedPdf.id,
      mimeType: uploadedPdf.mimeType,
      fileName: uploadedPdf.name,
      size: uploadedPdf.size,
      thumbnailUrl,
      thumbnailPublicId
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
    if (drive) {
      try {
        await drive.files.delete({ fileId: ws.driveFileId });
      } catch (e) {
        console.warn('Drive delete failed (non-fatal):', e && e.errors ? e.errors : e.message || e);
      }
    }

    // delete thumbnail from Cloudinary if exists
    if (cloudinary && ws.thumbnailPublicId) {
      try {
        await cloudinary.uploader.destroy(ws.thumbnailPublicId, { resource_type: 'image' });
      } catch (e) {
        console.warn('Cloudinary delete failed (non-fatal):', e.message || e);
      }
    }

    await ws.deleteOne();
    return res.json(new APIResponse(200, null, 'Worksheet deleted'));
  } catch (err) {
    console.error('deleteWorksheet error:', err);
    next(err);
  }
};
