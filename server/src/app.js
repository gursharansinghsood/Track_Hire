import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config/config.js'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.routes.js'
import applicationRoute from './routes/application.routes.js'
import dashboardRoute from './routes/dashboard.routes.js'
import userRoute from './routes/user.routes.js'


const app = express()


app.use(cors({ origin: config.clientUrl, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/health', (req, res) => res.status(200).json({ message: "Server is Running" }))

app.use('/auth', authRoute)

app.use('/applications', applicationRoute)

app.use('/dashboard', dashboardRoute)
app.use('/auth', userRoute)


app.use((req, res) => res.status(404).json({ message: "Page Not Found" }))



export default app
