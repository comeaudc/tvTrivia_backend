import { Router } from "express";
import questionCTRL from "../controllers/questionController.mjs";
import auth from '../middleware/basicAuth.mjs';
import adminAuth from "../middleware/adminAuth.mjs";

const router = Router();

// @route /api/question
router
  .route("/")
  // @desc POST Create new question
  // @access Admin
  .post(auth, adminAuth, questionCTRL.createNewQuestion)
  // @desc GET all questions
  // @access Public
  .get(questionCTRL.getAllQuestions);

// @route: /api/question/:id
router
  .route("/:id")
  // @desc: Update a question
  // @access: Admin
  .put(auth, adminAuth, questionCTRL.updateQuestion)
  // @desc: DELETE questions by ID
  // @access: Admin
  .delete(auth, adminAuth, questionCTRL.deleteQuestionById);

// @route: /api/question/category/:categoryId
router
  .route("/category/:categoryId")
  // @desc: GET Questions by category
  // @access: Public
  .get(questionCTRL.getQuestionByCategory)
  // @desc: DELETE category
  // @access: Admin
  .delete(auth, adminAuth, questionCTRL.deleteQuestionsByCategory);

export default router;
