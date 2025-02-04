import { Sequelize } from "sequelize"
import { POSTGRES_NAME, POSTGRES_USER, POSTGRES_PASSWORD, MONGO_URL, MONGO_NAME } from "../config"
import mongoose from "mongoose"

class DatabaseManager {
  //iniciar la conexion con sequilize
  static sequelizeConnection() {
    const sequelize = new Sequelize(POSTGRES_NAME!, POSTGRES_USER!, POSTGRES_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres'
    }) 

    return sequelize
  }

  //iniciar la conexion con mongo
  static async mongoConnection() {
    await mongoose.connect(MONGO_URL!, { dbName: MONGO_NAME })
    console.log('Mongo database connected successfully')
  }
}

//conectar con mongo
DatabaseManager.mongoConnection()

export default DatabaseManager