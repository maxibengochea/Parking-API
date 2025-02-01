import { ValidationType } from "../types/validation.type"

interface Body {
  name: string,
  email: string,
  password: string,
  role: string
}

class AuthValidator {
  //validar el 'body' en el 'register'
  static validRegister(body: Body): ValidationType {
    //si no hay 'body', returna false
    if (!body) {
      return {
        ok: false,
        error: "'body' is required"
      }
    }

    //todos los campos son requeridos
    if (!body.name || !body.email || !body.password || !body.role) {
      return {
        ok: false,
        error: "Fields 'name', 'email', 'password' and 'role' are required"
      }
    }

    //los roles estan hardcodeados, asi que si no coinciden, returna false
    if ((body.role !== 'administrador') && (body.role !== 'empleado') && (body.role !== 'cliente')) {
      return {
        ok: false,
        error: `Invalid role value: ${body.role}`,
      }
    }

    return { ok: true }
  }

  //validar el body en el 'login'
  static validLogin(body: Body): ValidationType {
    //si no hay 'body', returna false
    if (!body) {
      return {
        ok: false,
        error: "'body' is required"
      }
    }

    //todos los campos son requeridos
    if (!body.email || !body.password) {
     return {
       ok: false,
       error: "Fields 'email' and 'password'"
     }
    }

    return { ok: true }
  }
}

export default AuthValidator