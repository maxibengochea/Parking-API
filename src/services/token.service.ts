import { SECRET_TOKEN } from "../config"
import { UserType } from "../types/user.type"
import jwt from "jsonwebtoken"

//generar el 'jwt'
export const generateToken = (user: UserType) => {
  const tokenUser = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  return jwt.sign(tokenUser, SECRET_TOKEN!, {expiresIn: '1h'})
}