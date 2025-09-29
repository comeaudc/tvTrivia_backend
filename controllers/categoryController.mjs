import Category from "../models/categorySchema.mjs";

// Create Category -------------------------------
const createCategory = async (req, res) => {
  try {
    const { name, isActive } = req.body;
    if (!name || isActive) {
      return res.status(400).json({ msg: `Missing name and isActive` });
    }
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.status(400).json({ msg: `Already exist` });
    }
    let newCategory = await Category.create({
      name: name,
      isActive: isActive,
    });

    res.json({ msg: "Category created ", newCategory });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ msg: `Error - ${err.message}}` });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    let allCategory = await Category.find({});
    if (allCategory.length == 0) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(allCategory);
  } catch (err) {
    res.status(err.status || 500).json({ msg: err.message });
  }
};

// Update Category -----------------------------
const updateCategory = async (req, res) => {
  try {
    let updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidator: true }
    );
    if (!updateCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(updateCategory);
  } catch (err) {
    res.status(err.status || 500).json({ msg: err.message });
  }
};

// DELETE Category ------------------------------------
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    // console.log("Category deleted successfully:", deletedCategory.title);
    
    if (!deletedCategory) {
      return res.status(400).json({ msg: `Does not exist` });
    }
    res.json({
      success: true,
      message: "Category and associated comments deleted successfully",
    });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ msg: `Error - ${err.message}` });
  }
};

export default {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
};
