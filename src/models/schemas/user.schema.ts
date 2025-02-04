import { DataType } from "sequelize-typescript"
import DatabaseManager from "../db.config"
import { InferAttributes, InferCreationAttributes, CreationOptional, Model } from "sequelize"
import { hashPassword } from "../../services/password.service";

//crear el esquema del usuario en la db
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare role: CreationOptional<'cliente' | 'administrador' | 'empleado'>
} 

//iniciar los campos del esquema del usuario
User.init(
{
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataType.STRING,
  email: {
    type: DataType.STRING,
    unique: true,
    validate: { isEmail: true },
  },
  password: DataType.STRING,
  role: DataType.STRING
}, 
{ 
  sequelize: DatabaseManager.sequelizeConnection(),
  modelName: 'User',
  tableName: 'Users' 
})

//sincronizar el modelo en la base de datos y agreagr un administrador
const sync = async () => {
  await User.sync({ force: true })
  console.log('The table for the User model was just (re)created!')

  //crear un usuario administrador
  await User.create({
    name: 'admin',
    password: await hashPassword('admin'),
    email: 'admin@gmail.com',
    role: 'administrador'
  })
}

sync()

export default User