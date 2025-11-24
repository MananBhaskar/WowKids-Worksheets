const express = require("express");
const router = express.Router();
const multer = require("multer");
const asyncHandler = require("../utils/asyncHandler");
const adminAuth = require("../middlewares/adminAuth.middleware");

const {
  uploadWorksheet,
  deleteWorksheet,
} = require("../controllers/admin.worksheet.controller");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

const worksheetUploadFields = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);



const {
  createGrade,
  createSubject,
  listGrades,
  listSubjectsForGrade,
  deleteGrade,
  deleteSubject,
} = require("../controllers/admin.manage.controller");

router.post(
  "/worksheets",
  adminAuth,
  worksheetUploadFields,
  asyncHandler(uploadWorksheet)
);
router.delete("/worksheets/:id", adminAuth, asyncHandler(deleteWorksheet));

router.post("/grades", adminAuth, asyncHandler(createGrade));
router.post(
  "/grades/:gradeId/subjects",
  adminAuth,
  asyncHandler(createSubject)
);

router.delete("/grades/:gradeId", adminAuth, asyncHandler(deleteGrade));
router.delete("/subjects/:subjectId", adminAuth, asyncHandler(deleteSubject));

router.get("/public/grades", asyncHandler(listGrades));
router.get(
  "/public/grades/:gradeId/subjects",
  asyncHandler(listSubjectsForGrade)
);

module.exports = router;
