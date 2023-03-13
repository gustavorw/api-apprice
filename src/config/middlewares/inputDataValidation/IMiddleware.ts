import { httpRequest } from '../../../types/http'

interface IMiddleware {
    verifyData(httpRequest: httpRequest): Promise<boolean | string>
}

export { IMiddleware }
