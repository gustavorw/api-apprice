import { Router } from 'express'
import { routerAdapter } from '../adapters/expressRouterAdapter'
import { makeSignupController } from '../factories/user/signup'
import { middlewareAdapter } from '../adapters/middlewareRouterAdapter'
import { CreateUserMiddleware } from '../middlewares/inputDataValidation/createUserMiddleware'
import { makeLoginController } from '../factories/user/login'
import { LoginMiddleware } from '../middlewares/inputDataValidation/loginUserMiddleware'

const setUserRoutes = (router: Router): Router => {
    router.post(
        '/signup',
        middlewareAdapter(new CreateUserMiddleware()),
        routerAdapter(makeSignupController())
    )
    router.post(
        '/login',
        middlewareAdapter(new LoginMiddleware()),
        routerAdapter(makeLoginController())
    )
    return router
}

export { setUserRoutes }
