import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { IGetUserEmailRepository } from '../../repositories/user/intefaces/IGetUserEmailRepository'
import { LoginUserDTO } from '../../types/user'
import { IUseCase } from '../IUseCase'

class LoginUserUseCase
    implements IUseCase<LoginUserDTO, string, AuthenticationError>
{
    constructor(
        private readonly getUserMailRepository: IGetUserEmailRepository
    ) {}

    async execute(data: LoginUserDTO): Promise<string | AuthenticationError> {
        const user = await this.getUserMailRepository.getUserByEmail(data.email)
        if (!user) {
            return new AuthenticationError(
                'User do not exists with this email.'
            )
        }
        return ''
    }
}

export { LoginUserUseCase }
