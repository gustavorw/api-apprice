import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { ok, serverError, unauthorized } from '../../helpers/http/responses'
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
        try {
            const token = await this.loginUseCase.execute(httpResquest.body)
            if (token instanceof AuthenticationError) {
                return unauthorized(token.message)
            }
            return ok({ token: token })
        } catch (error) {
            return serverError()
        }
    }
}

export { LoginController }
