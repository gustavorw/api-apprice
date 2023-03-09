import { Request, Response, Router } from 'express'
import { routerAdapter } from '../adapters/expressRouterAdapter'
import { makeSignupController } from '../factories/signup'

const setUserRoutes = (router: Router): Router => {
    router.post('/signup', routerAdapter(makeSignupController()))
    router.get('/test', (req: Request, res: Response) => {
        res.status(200).json({ message: 'rota valida!' })
    })
    return router
}

export { setUserRoutes }
