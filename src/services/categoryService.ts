import { Category } from "../models/category.model"

type CategoryType = {
  name: string
  description?: string
}




const getAllCategories = async () => {
  return await Category.find().sort({ _id: -1 })
}

const createCaterories = async (data: CategoryType) => {
  return await Category.create(data)
}

const updateCategory = async (
  id: string,
  updates: Partial<CategoryType>
) => {
  return await Category.findByIdAndUpdate(id, updates, { new: true })
}
const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id)
}


export { getAllCategories, createCaterories, updateCategory, deleteCategory }