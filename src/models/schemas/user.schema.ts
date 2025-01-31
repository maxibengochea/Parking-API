import { DataType } from "sequelize-typescript"
import { sequelize } from "./db.config"
import { InferAttributes, InferCreationAttributes, CreationOptional, Model } from "sequelize"

//crear el esquema del usuario en la db
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
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
  sequelize,
  modelName: 'User' 
})

export default User
  
