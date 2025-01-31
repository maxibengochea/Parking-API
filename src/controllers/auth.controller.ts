import UserModel from "../models/user.model"
import { comparePasswords, hashPassword } from "../services/password.service"
import { Request, Response } from "express"
import { generateToken } from "../services/token.service"
import AuthValidator from "../validators/auth.validator"

class AuthController {
  //controlador de la ruta 'register'
  static async register(req: Request, res: Response): Promise<any> {
    //si el 'body' no es valido devolvemos el error
    if (!AuthValidator.register(req.body))
      return res.status(400).json({ error: 'Invalid body' })

    const { name, email, password, role} = req.body //parsear los campos del 'body'
    const hashedPassword = await hashPassword(password) //crear la 'password' hasheada

    //crer el nuevo usuario con la password hasheada
    const newUser = {
      name, 
      email, 
      password: hashedPassword,
      role
    }

    try {
      const user = await UserModel.findUser(newUser.email)

      //si el usuario ya se encuentra en la base de datos, falla el registro
      if (user)
        return res.status(401).json({ message: 'Email already in use' })

      await UserModel.addUser(newUser)
      const token = generateToken(newUser) //generar el 'jwt'
      res.status(201).json({ token: token })
    }

    catch (error: any) {
      res.status(500).json({ error: error })
    }
  }

  //controlador de la ruta 'login'
  static async login(req: Request, res: Response): Promise<any> {
    //si el 'body' no es valido devolvemos el error
    if (!AuthValidator.login(req.body))
      return res.status(400).json({ error: 'Invalid body' })

    //parsear los campos del body
    const { email, password } = req.body

    try {
      const user = await UserModel.findUser(email)
      
      //si no encontramos el usuario, no se puede logear
      if (!user)
        return res.status(401).json({ error: 'User not registred' })

      //si encontramos el usuario pero su 'password' hasheado no coincide con el 'password' ingresado
      if (!await comparePasswords(user.password, password))
        return res.status(401).json({ error: 'Incorrect password' })

      const token = generateToken(user) //generamos el 'jwt'
      res.json(200).json({ token: token })
    }

    catch (error: any) {
      res.status(500).json({ error: error })
    }
  }
}

export default AuthController