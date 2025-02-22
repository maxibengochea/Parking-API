import { ReservationType } from "../types/reservation.type"
import Reservation from "./schemas/reservation.schema"

interface UniqueFields {
  id?: string,
  date?: Date
}

class ReservationModel {
  //agregar una reservacion
  static async addReservation(reservation: ReservationType) {
    return await Reservation.create(reservation)
  }

  //encontrar una reservacion por la fecha
  static async findReservation(fields: UniqueFields) {
    return await Reservation.findOne({ where: { ...fields } })
  }

  //encontrar todas las reservaciones
  static async getAll() {
    return await Reservation.findAll()
  }
}

export default ReservationModel