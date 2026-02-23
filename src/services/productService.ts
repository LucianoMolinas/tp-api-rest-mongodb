import { Product } from "../models/product.model"

type ProductInput = {
  name: string
  description?: string
  price: number
  stock: number
  category: string
}

type ProductUpdate = Partial<ProductInput>

const getAllProducts = async () => {
  return await Product.find().populate("category").sort({ _id: -1 })
}

const createProduct = async (data: ProductInput) => {
  return await Product.create(data)
}

const updateProduct = async (id: string, updates: ProductUpdate) => {
  return await Product.findByIdAndUpdate(id, updates, { new: true })
}

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id)
}

export { getAllProducts, createProduct, updateProduct, deleteProduct }