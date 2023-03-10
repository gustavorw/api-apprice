import { Router } from 'express'
import { routerAdapter } from '../adapters/expressRouterAdapter'
import { makeSignupController } from '../factories/signup'

const setUserRoutes = (router: Router): Router => {
    router.post('/signup', routerAdapter(makeSignupController()))
    return router
}

export { setUserRoutes }
