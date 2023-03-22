import { IEncrypt } from '../../helpers/encrypt/interfaces/IEncrypt'
import { IHashCompare } from '../../helpers/hash/interfaces/ICompare'
import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { IGetUserEmailRepository } from '../../repositories/user/intefaces/IGetUserEmailRepository'
import { LoginUserDTO } from '../../types/user'
import { IUseCase } from '../IUseCase'

class LoginUserUseCase
    implements IUseCase<LoginUserDTO, string, AuthenticationError>
{
    constructor(
        private readonly getUserMailRepository: IGetUserEmailRepository,
        private readonly hashCompare: IHashCompare,
        private readonly encrypter: IEncrypt
    ) {}

    async execute(data: LoginUserDTO): Promise<string | AuthenticationError> {
        const user = await this.getUserMailRepository.getUserByEmail(data.email)
        if (!user) {
            return new AuthenticationError('Email not exists.')
        }
        const isEqual = await this.hashCompare.compare(
            data.password,
            user.password as string
        )
        if (!isEqual) {
            return new AuthenticationError('Wrong Password.')
        }
        const token = await this.encrypter.encrypt(user.id)
        return token
    }
}

export { LoginUserUseCase }
