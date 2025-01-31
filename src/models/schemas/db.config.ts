import { Sequelize } from "sequelize"
import { DB_NAME, DB_USER, DB_PASSWORD } from "../../config"

//iniciar la conexion con postgres
export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
}) 