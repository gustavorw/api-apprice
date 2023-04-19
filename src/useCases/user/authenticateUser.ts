import { IDecrypt } from '../../helpers/encrypt/interfaces/IDecrypt'
import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { CreatedUser, Header } from '../../types/user'
import { IUseCase } from '../IUseCase'
import { IGetUserIdRepository } from '../../repositories/user/intefaces/IGetUserIdRepository'

class AuthenticateUserUseCase
    implements IUseCase<Header, CreatedUser, AuthenticationError>
{
    constructor(
        private readonly decrypter: IDecrypt,
        private readonly getUserIdREpository: IGetUserIdRepository
    ) {}

    async execute(data: Header): Promise<CreatedUser | AuthenticationError> {
        if (!data.authorization) {
            return new AuthenticationError('Token not provided.')
        }
        const parts = data.authorization.split(' ')
        if (parts.length !== 2) {
            return new AuthenticationError('Invalid token.')
        }
        const [schema, token] = parts
        if (!/^Bearer$/i.test(schema)) {
            return new AuthenticationError('Token badly formatted.')
        }
        const value = await this.decrypter.decrypt(token)
        if (!/^[0-9]*$/.test(value as string)) {
            return new AuthenticationError('Expired token.')
        }
        const userExists = await this.getUserIdREpository.getUserById(
            value as number
        )
        if (!userExists) {
            return new AuthenticationError('Invalid token.')
        }
        const { password: _, ...user } = userExists
        return user
    }
}

export { AuthenticateUserUseCase, Header }
