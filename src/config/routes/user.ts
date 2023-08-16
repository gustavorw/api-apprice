import { Request, Response, Router } from 'express'
import { routerAdapter } from '../adapters/expressRouterAdapter'
import { makeSignupController } from '../factories/user/signup'
import { middlewareAdapter } from '../adapters/middlewareRouterAdapter'
import { CreateUserMiddleware } from '../middlewares/inputDataValidation/user/createUserMiddleware'
import { makeLoginController } from '../factories/user/login'
import { LoginMiddleware } from '../middlewares/inputDataValidation/user/loginUserMiddleware'
import { makeAuthMiddleware } from '../factories/user/authentication'
import { makeGetProfileController } from '../factories/user/getProfile'

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
    router.get(
        '/profile',
        middlewareAdapter(makeAuthMiddleware()),
        routerAdapter(makeGetProfileController())
    )
    return router
}

export { setUserRoutes }
