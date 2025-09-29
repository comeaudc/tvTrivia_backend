import { Router } from "express";
import questionCTRL from "../controllers/questionController.mjs";
import Question from "../models/questionSchema.mjs";
import Category from "../models/categorySchema.mjs";

const router = Router();

// @route /api/question
router
  .route("/")
  // @desc POST Create new question
  // @access Admin
  .post(questionCTRL.createNewQuestion)
  // @desc GET all questions
  // @access Public
  .get(questionCTRL.getAllQuestions);

// @route: /api/question/:id
router
  .route("/:id")
  // @desc: Update a question
  // @access: Admin
  .put(questionCTRL.updateQuestion)
  // @desc: DELETE questions by ID
  // @access: Admin
  .delete(questionCTRL.deleteQuestionById);

// @route: /api/question/category/:categoryId
router
  .route("/category/:categoryId")
  // @desc: GET Questions by category
  // @access: Public
  .get(questionCTRL.getQuestionByCategory)
  // @desc: DELETE category
  // @access: Admin
  .delete(questionCTRL.deleteQuestionsByCategory);

export default router;
