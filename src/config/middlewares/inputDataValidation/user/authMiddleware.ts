import { AuthenticationError } from '../../../../helpers/http/errors/authenticationError'
import {
    ok,
    serverError,
    unauthorized,
} from '../../../../helpers/http/responses'
import { httpRequest, httpResponse } from '../../../../types/http'
import { CreatedUser, Header } from '../../../../types/user'
import { IUseCase } from '../../../../useCases/IUseCase'
import { IMiddleware } from '../IMiddleware'

class AuthMiddleware implements IMiddleware {
    constructor(
        private readonly authenticateUserUseCase: IUseCase<
            Header,
            CreatedUser,
            AuthenticationError
        >
    ) {}

    async handle(httpResquest: httpRequest): Promise<httpResponse> {
        try {
            const user = await this.authenticateUserUseCase.execute(
                httpResquest.headers
            )
            if (user instanceof AuthenticationError) {
                return unauthorized(user.message)
            }
            return ok({ userId: user.id })
        } catch (error) {
            return serverError()
        }
    }
}

export { AuthMiddleware }
