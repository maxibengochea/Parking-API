import { DataType } from "sequelize-typescript"
import DatabaseManager from "./db.config"
import { InferAttributes, InferCreationAttributes, CreationOptional, Model } from "sequelize"

//crear el esquema de las reservaciones en la db
class Reservation extends Model<InferAttributes<Reservation>, InferCreationAttributes<Reservation>> {
  declare id: CreationOptional<number>
  declare clientId: number
  declare vehicle: string
  declare date: Date
} 

//iniciar los campos del esquema de la reservacion
Reservation.init(
{
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientId: DataType.INTEGER,
  vehicle: DataType.STRING,
  date: DataType.DATE
}, 
{ 
  sequelize: DatabaseManager.sequelizeConnection(),
  modelName: 'Reservation',
  tableName: 'Reservations' 
})

//sincronizar el modelo en la base de datos
const sync = async () => {
  await Reservation.sync({ force: true })
  console.log('The table for the Reservation model was just (re)created!')
}

sync()

export default Reservation