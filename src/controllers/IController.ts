import { httpRequest, httpResponse } from '../types/http'

interface IController {
    handle(httpResquest: httpRequest): Promise<httpResponse>
}

export { IController }
