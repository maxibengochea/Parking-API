import { Router } from "express"
import UserMiddleware from "../controllers/middlewares/user.middleware"
import ReservationController from "../controllers/reservation.controller"
import UserController from "../controllers/user.controller"

//crear el enrutador
const reservationRouter = Router()

//manejar las rutas
reservationRouter.post('/', UserMiddleware.authenticatedToken, ReservationController.addReservation)
reservationRouter.get('/', UserMiddleware.authenticatedToken, UserMiddleware.employeePermision, ReservationController.getAll)

export default reservationRouter
