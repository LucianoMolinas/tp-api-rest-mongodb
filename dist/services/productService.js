"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProducts = void 0;
const product_model_1 = require("../models/product.model");
const getAllProducts = async () => {
    return await product_model_1.Product.find().populate("category").sort({ _id: -1 });
};
exports.getAllProducts = getAllProducts;
const createProduct = async (data) => {
    return await product_model_1.Product.create(data);
};
exports.createProduct = createProduct;
const updateProduct = async (id, updates) => {
    return await product_model_1.Product.findByIdAndUpdate(id, updates, { new: true });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return await product_model_1.Product.findByIdAndDelete(id);
};
exports.deleteProduct = deleteProduct;
