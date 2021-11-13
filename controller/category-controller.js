const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllCategory = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  };

  const storeCategory = async (req, res) => {
    const { email, password, name, status, phone, address, age } = req.body;
    const category = new Category({ email, password, name, status, phone, address, age });
    await category.save();
    delete category.password;
    res.status(201).json(category);
  };

  const getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json(category);
  };
  const updateCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Data not found" });
    }
    category.type = req.body.type;
    category.genre = req.body.genre;
    

    await category.save();
    return res.status(200).json(category);
  };

  const destroyCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Data not found" });
    }
    await category.remove();
    return res.status(204).json({});
  };
  module.exports = {
    getAllCategory,
    getCategoryById,
    storeCategory,
    updateCategory,
    destroyCategory
  };