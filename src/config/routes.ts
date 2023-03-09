import { Express, Router } from 'express'
import { setUserRoutes } from './routes/user'

const setupRoutes = (app: Express): void => {
    const router = Router()
    app.use('/api/v1/user', setUserRoutes(router))
}

export { setupRoutes }
