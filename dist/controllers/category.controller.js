"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCategory = exports.updCategory = exports.createCategory = exports.getCategory = void 0;
const categoryService_1 = require("../services/categoryService");
const getCategory = async (req, res) => {
    try {
        const category = await (0, categoryService_1.getAllCategories)();
        res.json({ success: true, data: category });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.getCategory = getCategory;
const createCategory = async (req, res) => {
    try {
        const body = req.body;
        const { name, description } = body;
        if (!name) {
            return res.status(400).json({ success: false, error: "Data invalida, vuelve a intentarlo" });
        }
        const createdCategory = await (0, categoryService_1.createCaterories)(req.body);
        res.status(201).json({ success: true, data: createdCategory });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.createCategory = createCategory;
const updCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedCategory = await (0, categoryService_1.updateCategory)(id, updates);
        if (!updatedCategory) {
            return res.status(404).json({ success: false, error: "no existe la categoria para actualizar" });
        }
        res.json({ success: true, data: updatedCategory });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.updCategory = updCategory;
const delCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCategory = await (0, categoryService_1.deleteCategory)(id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, error: "no existe  la categoria que desea borrar" });
        }
        res.json({ success: true, data: deletedCategory });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.delCategory = delCategory;
