import { Request, Response } from 'express'
import { httpRequest, httpResponse } from '../../types/http'
import { IController } from '../../controllers/IController'

const routerAdapter = (controller: IController) => {
    return async (req: Request, res: Response) => {
        const httpResquest: httpRequest = {
            body: req.body,
        }
        const httpResponse: httpResponse = await controller.handle(httpResquest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}

export { routerAdapter }
