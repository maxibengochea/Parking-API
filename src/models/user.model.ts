import { UserType } from "../types/user.type"
import User from "./schemas/user.schema"

interface UniqueFields {
  id?: string,
  email?: string
}

class UserModel {
  //metodo para agregar un usuario a la db
  static async addUser(user: UserType) {
    return await User.create(user)
  }

  //metodo para buscar un usuario por un 'field' unico
  static async findUser(fields: UniqueFields) {
    return await User.findOne({ where: { ...fields } })
  }

  //obtener todos los usuarios
  static async getAll() {
    return await User.findAll()
  }
}

export default UserModel