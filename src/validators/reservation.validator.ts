import moment from "moment"
import { ValidationType } from "../types/validation.type"

//tipamos el body
interface Body {
  vehicle: string,
  date: string
}

class ReservationValidator {
  //validar la reservacion
  static validReservation(body: Body): ValidationType {
    //si no hay body, devolvemos false
    if (!body) {
      return {
        ok: false,
        error: "'body' is required"
      }
    }

    //parsear los campos del body
    const { vehicle, date } = body

    //validar el formato de la fecha
    if (!moment(date, moment.ISO_8601, true).isValid()) {
      return {
        ok: false,
        error: 'Invalid date format'
      }
    }

    //todos los campos son requeridos
    if (!vehicle || !date) {
      return {
        ok: false,
        error: "Fields 'vehicle' and 'date' are required"
      }
    }

    return { ok: true }  
  }
}

export default ReservationValidator