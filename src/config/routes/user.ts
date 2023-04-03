import { Request, Response, Router } from 'express'
import { routerAdapter } from '../adapters/expressRouterAdapter'
import { makeSignupController } from '../factories/user/signup'
import { middlewareAdapter } from '../adapters/middlewareRouterAdapter'
import { CreateUserMiddleware } from '../middlewares/inputDataValidation/user/createUserMiddleware'
import { makeLoginController } from '../factories/user/login'
import { LoginMiddleware } from '../middlewares/inputDataValidation/user/loginUserMiddleware'
import { makeAuthMiddleware } from '../factories/user/authentication'

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
        (req: Request, res: Response) => {
            return res.status(200).json({
                name: 'test user',
                email: 'testuser@email.com',
                price_hour: 10.5,
                createdAt: new Date('2023-03-08T09:00'),
                updatedAt: new Date('2023-03-08T09:00'),
            })
        }
    )
    return router
}

export { setUserRoutes }
