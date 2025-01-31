import  express  from "express"
import authRouter from "./routes/auth.routes"

//conectarnos a Postgress

//iniciar la app
const app = express()

//usar el middleware para parsear los json
app.use(express.json())

//usar las rutas
app.use('/auth', authRouter)

//devolver la 'app'
export default app