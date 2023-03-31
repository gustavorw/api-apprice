import { AuthenticationError } from '../../../../helpers/http/errors/authenticationError'
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
        await this.authenticateUserUseCase.execute(httpResquest.headers)
        return {
            body: {
                any: '',
            },
            statusCode: 200,
        }
    }
}

export { AuthMiddleware }
