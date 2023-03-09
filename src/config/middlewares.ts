import { Express } from 'express'
import { bodyParser } from './middlewares/bodyParser'
import { cors } from './middlewares/cors'

const setupMiddlewares = (app: Express): void => {
    app.use(bodyParser)
    app.use(cors)
}

export { setupMiddlewares }
