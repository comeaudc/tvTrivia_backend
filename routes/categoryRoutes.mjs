import express from "express";
import categoryCTRL from "../controllers/categoryController.mjs";

const router = express.Router();

// @route:  /api/categories 
router
  .route("/")
  //@Desc:  GET all categories
  //@access:    Public
  .get(categoryCTRL.getAllCategories)
  //@Desc:  Create Category
  //@access:    Admin 
  .post(categoryCTRL.createCategory);

// @route:  /api/categories/:id
router
  .route("/:id")
  //@Desc:  DELETE Category
  //@access:    Admin 
  .delete(categoryCTRL.deleteCategory)
  //@Desc:  Update Category
  //@access:    Admin 
  .put(categoryCTRL.updateCategory);


export default router;
