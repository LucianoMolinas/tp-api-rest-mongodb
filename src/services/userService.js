import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"

const newUser = async (data) => {

  const { email, password, username } = data

  const hash = await bcryptjs.hash(password, 10)

  const newDataUser = {
    email,
    password: hash,
    username
  }
  return await User.create(newDataUser)
}

const getUser = async (data) => {
  const { email } = data
  return await User.findOne({ email })
}

const validUser = async (passwordbd, passwordlog) => {
  return await bcryptjs.compare(passwordbd, passwordlog)
}

export { newUser, getUser, validUser }
