import { Router } from 'express'
import { routerAdapter } from '../adapters/expressRouterAdapter'
import { makeSignupController } from '../factories/signup'
import { middlewareAdapter } from '../adapters/middlewareRouterAdapter'
import { CreateUserMiddleware } from '../middlewares/inputDataValidation/createUserMiddleware'

const setUserRoutes = (router: Router): Router => {
    router.post(
        '/signup',
        middlewareAdapter(new CreateUserMiddleware()),
        routerAdapter(makeSignupController())
    )
    return router
}

export { setUserRoutes }
