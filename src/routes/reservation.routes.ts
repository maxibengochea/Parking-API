import { Router } from "express"
import UserMiddleware from "../controllers/middlewares/user.middleware"
import ReservationController from "../controllers/reservation.controller"

//crear el enrutador
const reservationRouter = Router()

//manejar las rutas
reservationRouter.post('/add', UserMiddleware.authenticatedToken, ReservationController.addReservation)
reservationRouter.get('/', UserMiddleware.authenticatedToken, UserMiddleware.employeePermision, ReservationController.getAll)

export default reservationRouter
