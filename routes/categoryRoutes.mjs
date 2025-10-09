import express from "express";
import categoryCTRL from "../controllers/categoryController.mjs";
import auth from '../middleware/basicAuth.mjs';
import adminAuth from '../middleware/adminAuth.mjs';

const router = express.Router();

// @route:  /api/categories 
router
  .route("/")
  //@Desc:  GET all categories
  //@access:    Public
  .get(categoryCTRL.getAllCategories)
  //@Desc:  Create Category
  //@access:    Admin 
  .post(auth, adminAuth, categoryCTRL.createCategory);

// @route:  /api/categories/:id
router
  .route("/:id")
  //@Desc:  DELETE Category
  //@access:    Admin 
  .delete(auth, adminAuth, categoryCTRL.deleteCategory)
  //@Desc:  Update Category
  //@access:    Admin 
  .put(auth, adminAuth,categoryCTRL.updateCategory);


export default router;
