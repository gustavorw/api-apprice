import { NextFunction, Request, Response } from 'express'
import { httpRequest, httpResponse } from '../../types/http'
import { IMiddleware } from '../middlewares/inputDataValidation/IMiddleware'

const middlewareAdapter = (middleware: IMiddleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: httpRequest = {
            body: req.body,
            headers: req.headers,
        }

        const httpResponse: httpResponse = await middleware.handle(httpRequest)
        if (httpResponse.statusCode === 200) {
            Object.assign(req, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            })
        }
    }
}

export { middlewareAdapter }
