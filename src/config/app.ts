import express from 'express'
import { setupRoutes } from './routes'
import { setupMiddlewares } from './middlewares'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
setupMiddlewares(app)
setupRoutes(app)

export { app }
