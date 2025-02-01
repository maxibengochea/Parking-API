import { Request, Response } from "express"
import ReservationValidator from "../validators/reservation.validator"
import ReservationModel from "../models/reservation.model"

class ReservationController {
  //controlador para agregar una reservacion
  static async addReservation(req: Request, res: Response): Promise<any> {
    //si el 'body' no es valido devolvemos el error
    const validationBody = ReservationValidator.validReservation(req.body)

    if (!validationBody.ok)
      return res.status(400).json({ error: validationBody.error })

    const { vehicle } = req.body //parseamos los campos del body
    const clientId = res.locals.token.id //obtenemos el id del usuario del token
    const date = new Date(req.body.date) //parsear la 'date'

    try {
      //si hay una reservacion para ese 'date' devolvemos error
      const reservation = await ReservationModel.findReservation({ date })

      if (reservation)
        return res.status(401).json({ error: 'Not disponible reservation for the provided date' })

      //agregamos la nueva reservacion
      const newReservation = await ReservationModel.addReservation({ clientId, vehicle, date })

      res.status(201).json({ 
        id: newReservation.id,
        clientId: newReservation.clientId,
        clientVehicle: newReservation.vehicle,
        date: newReservation.date
      })
    }

    catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  //controlador para devolver todas las reservaciones
  static async getAll(req: Request, res: Response): Promise<any> {
    try {
      const reservations = await ReservationModel.getAll() //devolver todas las reservaciones del parqueo
      const status = reservations.length === 0 ? 204 : 200 //manejar el status de la respuesta

      res.status(status).json({ result: reservations.map(reservation => ({
        id: reservation.id,
        clientId: reservation.clientId,
        vehicle: reservation.vehicle,
        date: reservation.date
      }))})
    }

    catch (error) {
      console.log(error)
      res.status(500).json({ error })     
    }
  }
}

export default ReservationController