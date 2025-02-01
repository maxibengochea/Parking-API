import { Router } from 'express'
import UserMiddleware from '../controllers/middlewares/user.middleware'
import AuthController from '../controllers/auth.controller'

//crear el enrutador
const authRouter = Router()

//manejar las rutas
authRouter.post('/register', UserMiddleware.authenticatedToken, UserMiddleware.adminPermision, AuthController.register)
authRouter.post('/login', AuthController.login)

export default authRouter