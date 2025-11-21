const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB
const asyncHandler = require('../utils/asyncHandler');
const adminAuth = require('../middlewares/adminAuth.middleware');

const {
  uploadWorksheet,
  deleteWorksheet
} = require('../controllers/admin.worksheet.controller');

const {
  createGrade,
  createSubject,
  listGrades,
  listSubjectsForGrade
} = require('../controllers/admin.manage.controller');

router.post('/worksheets', adminAuth, upload.single('file'), asyncHandler(uploadWorksheet));
router.delete('/worksheets/:id', adminAuth, asyncHandler(deleteWorksheet));

router.post('/grades', adminAuth, asyncHandler(createGrade));
router.post('/grades/:gradeId/subjects', adminAuth, asyncHandler(createSubject));

router.get('/public/grades', asyncHandler(listGrades));
router.get('/public/grades/:gradeId/subjects', asyncHandler(listSubjectsForGrade));

module.exports = router;
