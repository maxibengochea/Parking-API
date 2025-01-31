export class AuthValidator {
  //validar el 'body' en el 'register'
  static register(body: any) {
    //si no hay 'body', returna false
    if (!body)
      return false

    const { name, email, password, role } = body

    //los roles estan hardcodeados, asi que si no coinciden, returna false
    if ((role !== 'administrador') && (role !== 'empleado') && (role !== 'cliente'))
      return false

    //todos los campos son requeridos
    return (name !== undefined) && (email !== undefined) && (password !== undefined) && (role !== undefined)
  }

  static login(body: any) {
    //si no hay 'body', returna false
    if (!body)
      return false

    const { email, password} = body
    return (email !== undefined) && (password !== undefined) //todos los campos son requeridos
  }
}

export default AuthValidator