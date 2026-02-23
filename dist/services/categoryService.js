"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCaterories = exports.getAllCategories = void 0;
const category_model_1 = require("../models/category.model");
const getAllCategories = async () => {
    return await category_model_1.Category.find().sort({ _id: -1 });
};
exports.getAllCategories = getAllCategories;
const createCaterories = async (data) => {
    return await category_model_1.Category.create(data);
};
exports.createCaterories = createCaterories;
const updateCategory = async (id, updates) => {
    return await category_model_1.Category.findByIdAndUpdate(id, updates, { new: true });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    return await category_model_1.Category.findByIdAndDelete(id);
};
exports.deleteCategory = deleteCategory;
