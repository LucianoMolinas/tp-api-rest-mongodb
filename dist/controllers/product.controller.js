"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delProduct = exports.updProduct = exports.crtProduct = exports.getProducts = void 0;
const productService_1 = require("../services/productService");
const getProducts = async (req, res) => {
    try {
        const products = await (0, productService_1.getAllProducts)();
        res.json({ success: true, data: products });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.getProducts = getProducts;
const crtProduct = async (req, res) => {
    try {
        const body = req.body;
        const { name, price, stock, category, description } = body;
        if (!name) {
            return res.status(400).json({ success: false, error: "Data invalida, vuelve a intentarlo" });
        }
        const createdProduct = await (0, productService_1.createProduct)(req.body);
        res.status(201).json({ success: true, data: createdProduct });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.crtProduct = crtProduct;
const updProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedProduct = await (0, productService_1.updateProduct)(id, updates);
        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "no existe el producto para actualizar" });
        }
        else {
            res.json({ success: true, data: updatedProduct });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.updProduct = updProduct;
const delProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await (0, productService_1.deleteProduct)(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "no existe el producto para borrar" });
        }
        res.status(200).json({ success: true, data: deletedProduct });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.delProduct = delProduct;
