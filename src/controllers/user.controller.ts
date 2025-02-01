import { Request, Response } from "express"
import UserValidator from "../validators/user.validator"
import UserModel from "../models/user.model"

class UserController {
  //controlador para manejar la modificacion de los campos de un usuario
  static async modifyUser(req: Request, res: Response): Promise<any> {
    //verificar la 'request'
    const reqValidation = UserValidator.validModify(req)

    if (!reqValidation.ok)
      return res.status(401).json({ error: reqValidation.error })
    
    const { id } = req.params //extraer el 'id' de la 'request'
    const { name, email } = req.body //parsear los campos del 'body'

    try {
      //buscamos el usuario en la base de datos
      const user = await UserModel.findUser({ id })

      if (!user)
        return res.status(404).json({ error: 'Not found' })

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