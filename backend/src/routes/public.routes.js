const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const {
  getWorksheetDetails,
  listWorksheetsByGradeSubject,
  previewWorksheet,
  downloadWorksheet
} = require('../controllers/public.worksheet.controller');

// GET metadata for a worksheet
router.get('/worksheets/:id', asyncHandler(getWorksheetDetails));

// Inline preview (Content-Disposition: inline)
router.get('/worksheets/:id/preview', asyncHandler(previewWorksheet));

// Attachment download (Content-Disposition: attachment)
router.get('/worksheets/:id/download', asyncHandler(downloadWorksheet));
router.get('/grades/:gradeId/subjects/:subjectId/worksheets', asyncHandler(listWorksheetsByGradeSubject));
module.exports = router;
