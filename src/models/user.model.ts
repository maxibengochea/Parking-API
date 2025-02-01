import { UserType } from "../types/user.type"
import User from "./schemas/user.schema"

class UserModel {
  //metodo para agregar un usuario a la db
  static async addUser(user: UserType) {
    return await User.create(user)
  }

  //metodo para buscar un usuario por su email
  static async findUser(email: string) {
    return await User.findOne({ where: { email } })
  }
}

export default UserModel