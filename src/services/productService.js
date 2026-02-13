
import { Product } from "../models/product.model.js"



const getAllProducts = async () => {

  return await Product.find().populate("category").sort({ _id: -1 })

}


const createProduct = async (data) => {
  return await Product.create(data)

}


const updateProduct = async (id, updates) => {
  return await Product.findByIdAndUpdate(id, updates, { new: true })

}

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id)

}




export { getAllProducts, createProduct, updateProduct, deleteProduct }