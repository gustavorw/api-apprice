import { NextFunction, Request, Response } from 'express'
import { httpRequest, httpResponse } from '../../types/http'
import { IMiddleware } from '../middlewares/inputDataValidation/IMiddleware'

const middlewareAdapter = (middleware: IMiddleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: httpRequest = {
            body: req.body,
        }

        const httpResponse: httpResponse = await middleware.handle(httpRequest)
        if (httpResponse.body.success) {
            next()
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            })
        }
    }
}

export { middlewareAdapter }
