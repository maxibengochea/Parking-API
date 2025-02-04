import { config } from 'dotenv'

config()

//manejar las variables de entorno en un archivo de configuracion
export const { 
  PORT, //puerto de escucha del servidor
  POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_NAME, //variables de entorno relacionadas a posgres
  SALT_ROUNDS, //saltos para hashear con becrypt
  SECRET_TOKEN, //palabra secreta para tokenizar
  MONGO_URL, MONGO_NAME //variables de entorno relacionadas a mongo
 } = process.env