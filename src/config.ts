import dotenv from 'dotenv'

dotenv.config()

export const { PORT, DB_USER, DB_PASSWORD, DB_NAME, SALT_ROUNDS, SECRET_TOKEN } = process.env