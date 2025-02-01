import { Router } from "express";
import UserMiddleware from "../controllers/middlewares/user.middleware";
import UserController from "../controllers/user.controller";

//crear el enrutador
const userRouter = Router()

//manejar las rutas
userRouter.get('/', UserMiddleware.authenticatedToken, UserMiddleware.adminPermision, UserController.getAll)
userRouter.put('/:id', UserMiddleware.authenticatedToken, UserMiddleware.adminPermision, UserController.modifyUser)

export default userRouter