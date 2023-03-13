import { NextFunction, Request, Response } from 'express'
import { httpRequest } from '../../types/http'
import { IMiddleware } from '../middlewares/inputDataValidation/IMiddleware'

const middlewareAdapter = (middleware: IMiddleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: httpRequest = {
            body: req.body,
        }

        const dataValidation = await middleware.verifyData(httpRequest)
        if (dataValidation === true) {
            next()
        } else {
            res.status(400).json({ error: dataValidation })
        }
    }
}

export { middlewareAdapter }
