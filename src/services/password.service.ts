import bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../config"

//hashear la 'password' con bcrypt
export const hashPassword = async (password: string) : Promise<string> => {
  return await bcrypt.hash(password, Number(SALT_ROUNDS!))
}

//comparar una 'password' con un hash de bcrypt
export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}