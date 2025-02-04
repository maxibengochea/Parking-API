import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { SECRET_TOKEN } from "../../config"
import UserModel from "../../models/user.model"

class UserMiddleware {
  //middleware para controlar si un usuario esta autenticado
  static async authenticatedToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    //parsear e; token del 'header'
    const headerInfo = req.headers['authorization']
    const token = headerInfo?.split(' ')[1]

    //si no hay token, el usuario no tiene permisos
    if (!token)
      return res.status(401).json({ error: 'Unauthorized' })

    //si el token no es valido o expiro, el usuario no tiene permisos
    jwt.verify(token, SECRET_TOKEN!, (error, decoded) => {
      if (error)
        return res.status(401).json({ error: 'Invalid token' })

      //si el token es valido, lo guardamos en el objeto 'res' para su posterior manejo
      res.locals.token = decoded
      next()
    })

  }
  
  //middleware para manejar las rutas que solo son permisibles por los administradores
  static async adminPermision(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { role } = res.locals.token

    if (role != 'administrador')
      return res.status(401).json({ error: 'Unauthorized: Only admins has access to this resource' })

    next()
  }

  //middleware para manejar las rutas que solo son permisibles por los administradores y los empleados
  static async employeePermision(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { role } = res.locals.token

    if (role == 'cliente')
      return res.status(401).json({ error: 'Unauthorized: Clients have not access to this resource' })

    next()
  }

  //middleware para las operaciones CRUD que necesiten obtener un usuario 
  static async getUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params

    //si no hay 'id' devolvemos el error
    if (!id)
      return res.status(400).json({ error:  "Not 'id' provided" })

    try {
      //encontrar al usuario por su 'id'
      const user = await UserModel.findUser({ id })

      //si no hay usuario, devolvemos un 404
      if (!user)
        return res.status(404).json({ error: 'Not found' })

      //si hay usuario, lo guardamos para su posterior procesamiento
      res.locals.user = user
      next()
    }

    catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}

export default UserMiddleware