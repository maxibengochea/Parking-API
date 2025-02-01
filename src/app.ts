import  express  from "express"
import authRouter from "./routes/auth.routes"
import reservationRouter from "./routes/reservation.routes"

//iniciar la app
const app = express()

//usar el middleware para parsear los json
app.use(express.json())

//usar las rutas
app.use('/', authRouter)
app.use('/reservation', reservationRouter)

export default app