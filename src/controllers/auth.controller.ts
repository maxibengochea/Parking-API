import UserModel from "../models/user.model"
import { comparePasswords, hashPassword } from "../services/password.service"
import { Request, Response } from "express"
import { generateToken } from "../services/token.service"
import AuthValidator from "../validators/auth.validator"

class AuthController {
  //controlador de la ruta 'register'
  static async register(req: Request, res: Response): Promise<any> {
    //si el 'body' no es valido devolvemos el error
    const validationBody = AuthValidator.validRegister(req.body)
    
    if (!validationBody.ok)
      return res.status(400).json({ error: validationBody.error })

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
      const user = await UserModel.findUser(email)

      //si el usuario ya se encuentra en la base de datos, falla el registro
      if (user)
        return res.status(401).json({ error: 'Email already in use' })

      const addedUser = await UserModel.addUser(newUser)
      const token = generateToken(addedUser) //generar el 'jwt'
      res.status(201).json({ token })
    }

    catch (error: any) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  //controlador de la ruta 'login'
  static async login(req: Request, res: Response): Promise<any> {
    //si el 'body' no es valido devolvemos el error
    const validationBody = AuthValidator.validLogin(req.body)
    
    if (!validationBody.ok)
      return res.status(400).json({ error: validationBody.error })

    //parsear los campos del body
    const { email, password } = req.body

    try {
      const user = await UserModel.findUser({ email })
      
      //si no encontramos el usuario, no se puede logear
      if (!user)
        return res.status(401).json({ error: 'User not registred' })

      //si encontramos el usuario pero su 'password' hasheado no coincide con el 'password' ingresado
      const comparision = await comparePasswords(password, user.password)

      if (!comparision)
        return res.status(401).json({ error: 'Incorrect password' })

      const token = generateToken(user) //generamos el 'jwt'
      res.status(200).json({ token })
    }

    catch (error: any) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}

export default AuthController