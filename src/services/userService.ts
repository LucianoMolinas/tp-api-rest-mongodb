import { User } from "../models/user.model"
import bcryptjs from "bcryptjs"

type DataUser
  = {
    email: string,
    password: string,
    username: string
  }


const newUser = async (data: DataUser) => {

  const { email, password, username } = data

  const hash = await bcryptjs.hash(password, 10)

  const newDataUser = {
    email,
    password: hash,
    username
  }


  return await User.create(newDataUser)
}

const getUser = async (data: DataUser) => {
  const { email } = data
  return await User.findOne({ email })
}

const validUser = async (passwordbd: string, passwordlog: string) => {
  return await bcryptjs.compare(passwordbd, passwordlog)
}

export { newUser, getUser, validUser }
