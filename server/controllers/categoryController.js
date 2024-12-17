import { Category } from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json({ message: 'Categories fetched successfully', data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};



export const addCategory = async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins and sellers can add categories' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({ name, subcategories: [] });
    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message || 'Failed to add category' });
  }
};


export const updateCategory = async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update categories' });
    }

    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name;
    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update category' });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { role } = req.admin;

    if (req.admin.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete categories' });
    }

    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.deleteOne();

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete category' });
  }
};


export const addSubcategory = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin' && role !== 'seller') {
      return res.status(403).json({ message: 'Only admins and sellers can add subcategories' });
    }

    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Subcategory name is required' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const existingSubcategory = category.subcategories.find(
      (subcat) => subcat.name.toLowerCase() === name.toLowerCase()
    );
    if (existingSubcategory) {
      return res.status(409).json({ message: 'Subcategory already exists' });
    }

    category.subcategories.push({ name });
    await category.save();

    res.status(201).json({ message: 'Subcategory added successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to add subcategory' });
  }
};


export const updateSubcategory = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin' && role !== 'seller') {
      return res.status(403).json({ message: 'Only admins and sellers can update subcategories' });
    }

    const { categoryId, subcategoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Subcategory name is required' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subcategory = category.subcategories.find(
      (subcat) => subcat._id.toString() === subcategoryId
    );
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    subcategory.name = name;
    await category.save();

    res.status(200).json({ message: 'Subcategory updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update subcategory' });
  }
};


export const deleteSubcategory = async (req, res) => {
  try {
    const { role } = req.admin;
    if (role !== 'admin' && role !== 'seller') {
      return res.status(403).json({ message: 'Only admins and sellers can delete subcategories' });
    }

    const { categoryId, subcategoryId } = req.params;

    console.log("Deleting subcategory...");
    console.log("Category ID:", categoryId);
    console.log("Subcategory ID:", subcategoryId);

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }


    console.log("Category found:", category);
    const subcategoryIndex = category.subcategories.findIndex(
      (subcat) => subcat._id.toString() === subcategoryId
    );

    if (subcategoryIndex === -1) {
      console.log("Subcategory index not found");
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    category.subcategories.splice(subcategoryIndex, 1);
    await category.save();

    res.status(200).json({ message: 'Subcategory deleted successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete subcategory' });
  }
};