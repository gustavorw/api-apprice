import express from 'express'
import { setupMiddlewares } from './middlewares'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
setupMiddlewares(app)

export { app }
