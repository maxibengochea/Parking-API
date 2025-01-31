import { SECRET_TOKEN } from "../config"
import { UserType } from "../types/user.type"
import jwt from "jsonwebtoken"

//generar el 'jwt'
export const generateToken = (user: UserType) => {
  const { id, email, role } = user

  const tokenUser = {
    id,
    email,
    role
  }

  return jwt.sign(tokenUser, SECRET_TOKEN!, {expiresIn: '1h'})
}