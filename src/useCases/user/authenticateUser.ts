import { number, string } from 'zod'
import { IDecrypt } from '../../helpers/encrypt/interfaces/IDecrypt'
import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { CreatedUser } from '../../types/user'
import { IUseCase } from '../IUseCase'
import { IGetUserIdRepository } from '../../repositories/user/intefaces/IGetUserIdRepository'

type Header = {
    authorization?: string
}

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
            return new AuthenticationError(value as string)
        }
        const userId = Number(value)
        await this.getUserIdREpository.getUserById(userId)

        return new Promise((resolve) =>
            resolve({
                id: 1,
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'hash_password',
                price_hour: 10.5,
                createdAt: new Date('2023-03-08T09:00'),
                updatedAt: new Date('2023-03-08T09:00'),
            })
        )
    }
}

export { AuthenticateUserUseCase, Header }
