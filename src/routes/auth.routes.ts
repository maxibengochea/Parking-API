import { Router } from 'express'
import UserMiddleware from '../controllers/middlewares/user.middleware'
import AuthController from '../controllers/auth.controller'

//crear el enrutador
const authRouter = Router()

//manejar las rutas
authRouter.post('/', UserMiddleware.authenticatedToken, UserMiddleware.adminPermision, AuthController.register)
authRouter.get('/',  UserMiddleware.authenticatedToken, UserMiddleware.adminPermision, AuthController.login)

//devolver el 'router'
export default authRouter