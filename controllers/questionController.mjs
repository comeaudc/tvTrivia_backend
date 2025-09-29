import Question from "../models/questionSchema.mjs";
import Category from "../models/categorySchema.mjs";

// Create New Question ---------------------------------
let createNewQuestion = async (req, res) => {
  try {
    const { categoryId, questionText, correctAnswer, options } = req.body;
    if (!categoryId || !questionText || !correctAnswer) {
      return res.status(400).json({
        msg: `Fields "categoryId", "questionText", "correctAnswer" are required`,
      });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        msg: `The categoryId with value "${categoryId}" does not exist`,
      });
    }
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    console.error(`❌ Error :`, error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Get All Questions -------------------------------
const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find({});
    res.json(allQuestions);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: `:x: Error - ${err.message}` });
  }
};

// Get Questions By Category ------------------------
const getQuestionByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return res.status(400).json({
        msg: `The Category Param categoryId is missing`,
      });
    }

    const questions = await Question.find({ categoryId: categoryId });
    res.status(200).json(questions);
  } catch (error) {
    console.error(`❌ Error :`, error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Update Question by ID ----------------------------------
const updateQuestion = async (req, res) => {
  try {
    const updateQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return the updated document
        runValidators: true,
      } // enables schema validation when updating documents, its false by default
    );
    // if Question exist
    if (!updateQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updateQuestion);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: `❌ Error - ${err.message}` });
  }
};

const deleteQuestionById = async (req, res) => {
  try {
    let deleteQuestion = await Question.findByIdAndDelete(req.params.id);
    res.json({ msg: "Question deleted", deleteQuestion });
  } catch (error) {
    console.error(`Error:`, error.message);
    res.status(500).json({ msg: `Error - ${error.message}` });
  }
};

const deleteQuestionsByCategory = async (req, res) => {
  try {
    let deleteCategory = await Question.deleteMany({
      categoryId: req.params.id,
    });
    res.json({ msg: "Category deleted", deleteCategory });
  } catch (error) {
    console.error(`Error:`, error.message);
    res.status(500).json({ msg: `Error - ${error.message}` });
  }
};

export default {
  createNewQuestion,
  getAllQuestions,
  getQuestionByCategory,
  updateQuestion,
  deleteQuestionById,
  deleteQuestionsByCategory
};
