import { Sequelize } from "sequelize"
import { POSTGRES_NAME, POSTGRES_USER, POSTGRES_PASSWORD } from "../../config"

class DatabaseManager {
  //iniciar la conexion con sequilize
  static sequelizeConnection() {
    const sequelize = new Sequelize(POSTGRES_NAME!, POSTGRES_USER!, POSTGRES_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres'
    }) 

    return sequelize
  }
}

export default DatabaseManager