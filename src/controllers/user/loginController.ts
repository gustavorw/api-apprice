import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { httpRequest, httpResponse } from '../../types/http'
import { LoginUserDTO } from '../../types/user'
import { IUseCase } from '../../useCases/IUseCase'
import { IController } from '../IController'

class LoginController implements IController {
    constructor(
        private readonly loginUseCase: IUseCase<
            LoginUserDTO,
            string,
            AuthenticationError
        >
    ) {}
    async handle(httpResquest: httpRequest): Promise<httpResponse> {
        await this.loginUseCase.execute(httpResquest.body)
        return new Promise((resolve) => resolve({ statusCode: 200, body: '' }))
    }
}

export { LoginController }
