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

    const { date, vehicle } = req.body //parseamos los campos del body
    const clientId = res.locals.token.id //obtenemos el id del usuario del token

    try {
      //si hay una reservacion para ese 'date' devolvemos error
      const reservation = await ReservationModel.findReservation(date)

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
}

export default ReservationController