import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { unauthorized } from '../../helpers/http/responses'
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
        const token = await this.loginUseCase.execute(httpResquest.body)
        if (token instanceof AuthenticationError) {
            return unauthorized(token.message)
        }
        return new Promise((resolve) => resolve({ statusCode: 200, body: '' }))
    }
}

export { LoginController }
