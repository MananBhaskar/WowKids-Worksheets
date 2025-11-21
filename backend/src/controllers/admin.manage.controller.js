const Grade = require('../models/grade.model');
const Subject = require('../models/subject.model');
const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const APIResponse = require('../utils/APIResponse');

// POST /api/v1/admin/grades
// body: { name, slug, order }

exports.createGrade = async (req, res, next) => {
  try {
    const { name, slug, order } = req.body;
    if (!name || !slug) return next(new APIError(400, 'name and slug are required'));

    // upsert check: avoid duplicate slug
    const exists = await Grade.findOne({ slug });
    if (exists) return next(new APIError(400, 'Grade with this slug already exists'));

    const grade = new Grade({ name, slug, order: order || 0 });
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
    const { name, slug, order } = req.body;

    if (!mongoose.Types.ObjectId.isValid(gradeId)) return next(new APIError(400, 'Invalid gradeId'));
    if (!name || !slug) return next(new APIError(400, 'name and slug are required'));

    // ensure grade exists
    const grade = await Grade.findById(gradeId);
    if (!grade) return next(new APIError(404, 'Grade not found'));

    // optional duplicate-check per grade+slug
    const exists = await Subject.findOne({ grade: gradeId, slug });
    if (exists) return next(new APIError(400, 'Subject with this slug already exists for this grade'));

    const subject = new Subject({ grade: gradeId, name, slug, order: order || 0 });
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
    if (!mongoose.Types.ObjectId.isValid(gradeId)) return next(new APIError(400, 'Invalid gradeId'));
    const subjects = await Subject.find({ grade: gradeId }).sort({ order: 1, name: 1 });
    return res.json(new APIResponse(200, subjects, 'Subjects fetched'));
  } catch (err) {
    console.error('listSubjectsForGrade error:', err);
    next(err);
  }
};
