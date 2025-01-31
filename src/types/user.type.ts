//tipado del usuario
export interface UserType {
  id?: number,
  name: string,
  email: string,
  password: string,
  role: 'administrador' | 'empleado' | 'cliente'
}