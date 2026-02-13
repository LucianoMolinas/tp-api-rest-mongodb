import { Category } from "../models/category.model.js"



const getAllCategories = async () => {

  return await Category.find().sort({ _id: -1 })

}

const createCaterories = async (data) => {
  return await Category.create(data)

}


const updateCategory = async (id, updates) => {
  return await Category.findByIdAndUpdate(id, updates, { new: true })

}

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id)

}








export { getAllCategories, createCaterories, updateCategory, deleteCategory }