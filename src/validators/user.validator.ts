import { ValidationType } from "../types/validation.type"

interface Body {
  name: string,
  email: string,
  password: string,
  role: string
}

interface Params {
  id?: string | number
}

interface Request {
  params: Params
  body: Body
}

class UserValidator {
  static validModify(req: Request): ValidationType {
    //si no hay 'id' , devolvemos el error
    if (!req.params.id) {
      return {
        ok: false,
        error:  "Not 'id' provided"
      }
    }

    //si no hay 'body', devolvemos el error
    if (!req.body) {
      return {
        ok: false,
        error: "'body' is required"
      }
    }

    return { ok: true }
  }
}

export default UserValidator