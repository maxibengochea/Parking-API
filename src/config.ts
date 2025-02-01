import { config } from 'dotenv'

config()

//manejar las variables de entorno en un archivo de configuracion
export const { PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_NAME, SALT_ROUNDS, SECRET_TOKEN } = process.env