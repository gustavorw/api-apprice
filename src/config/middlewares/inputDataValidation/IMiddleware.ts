import { httpRequest, httpResponse } from '../../../types/http'

interface IMiddleware {
    handle(httpResquest: httpRequest): Promise<httpResponse>
}

export { IMiddleware }
