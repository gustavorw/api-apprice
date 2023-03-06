import { httpResponse } from '../../types/http'
import { ServerError } from './serverError'

const badRequest = (errorMessage: string): httpResponse => ({
    statusCode: 400,
    body: {
        error: errorMessage,
    },
})

const serverError = (): httpResponse => ({
    statusCode: 500,
    body: new ServerError(),
})

const ok = (data: any): httpResponse => ({
    statusCode: 200,
    body: data,
})

const created = (data: any): httpResponse => ({
    statusCode: 201,
    body: data,
})

export { badRequest, serverError, ok, created }
