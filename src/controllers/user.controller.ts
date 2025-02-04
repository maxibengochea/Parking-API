import { Request, Response } from "express"
import UserModel from "../models/user.model"

class UserController {
  //controlador para manejar la modificacion de los campos de un usuario
  static async modifyUser(req: Request, res: Response): Promise<any> {
    const { name, email } = req.body //parsear los campos del 'body'

    try {
      //buscamos el usuario en la base de datos
      const user = res.locals.user

      //actualizar el usuario en la base de datos
      user.name= name ?? user.name,
      user.email= email ?? user.email
      await user.save()

      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      })
    }

    catch (error) {
      console.log(error)
      res.status(500).json({ error })     
    }
  }

  //obtener todos los usuarios
  static async getAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await UserModel.getAll() //devolver todos los usuarios

      res.status(200).json({ result: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      }))})
    }

    catch (error) {
      console.log(error)
      res.status(500).json({ error })     
    }
  }
}

export default UserController