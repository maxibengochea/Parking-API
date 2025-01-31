import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { SECRET_TOKEN } from "../../config"

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
        return res.status(401).json({ error: 'Token invalido' })

      //si el token es valido, lo guardamos en el objeto 'res' para su posterior manejo
      res.locals.token = decoded
    })

    next()
  }
  
  //middleware para manejar las rutas que solo son permisibles por los administradores
  static async adminPermision(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { role } = res.locals.token

    if (role != 'administrador')
      return res.status(401).json({ error: 'Unauthorized' })

    next()
  }

  //middleware para manejar las rutas que solo son permisibles por los administradores y los empleados
  static async employeePermision(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { role } = res.locals.token

    if (role == 'cliente')
      return res.status(401).json({ error: 'Unauthorized' })

    next()
  }
}

export default UserMiddleware