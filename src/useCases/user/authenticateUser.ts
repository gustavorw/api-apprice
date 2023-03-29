import { AuthenticationError } from '../../helpers/http/errors/authenticationError'
import { CreatedUser } from '../../types/user'
import { IUseCase } from '../IUseCase'

type Header = {
    authorization?: string
}

class AuthenticateUserUseCase
    implements IUseCase<Header, CreatedUser, AuthenticationError>
{
    async execute(data: Header): Promise<CreatedUser | AuthenticationError> {
        if (!data.authorization) {
            return new AuthenticationError('Token not provided.')
        }
        const parts = data.authorization.split('')
        if (parts.length !== 2) {
            return new AuthenticationError('Invalid token.')
        }

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
