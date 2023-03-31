import { describe, expect, test, vi } from 'vitest'
import { AuthMiddleware } from '../../../../src/config/middlewares/inputDataValidation/user/authMiddleware'
import { IUseCase } from '../../../../src/useCases/IUseCase'
import { CreatedUser, Header } from '../../../../src/types/user'
import { AuthenticationError } from '../../../../src/helpers/http/errors/authenticationError'

const fakeData = () => ({
    headers: {
        authorization: 'Bearer any_token',
    },
})

const makeAuthenticateUser = (): IUseCase<
    Header,
    CreatedUser,
    AuthenticationError
> => {
    class AuthenticateUserStub
        implements IUseCase<Header, CreatedUser, AuthenticationError>
    {
        execute(data: Header): Promise<AuthenticationError | CreatedUser> {
            return new Promise((resolve) =>
                resolve({
                    id: 1,
                    name: 'any_name',
                    email: 'any_email@email.com',
                    price_hour: 10.5,
                    createdAt: new Date('2023-03-08T09:00'),
                    updatedAt: new Date('2023-03-08T09:00'),
                })
            )
        }
    }
    return new AuthenticateUserStub()
}

const makeSut = () => {
    const authenticateUserStub = makeAuthenticateUser()
    const sut = new AuthMiddleware(authenticateUserStub)
    return { sut, authenticateUserStub }
}

describe('test authMiddleware', () => {
    test('test call excute method of authenticateUserUseCase with headers', async () => {
        const { sut, authenticateUserStub } = makeSut()
        const authenticateUserStubSpy = vi.spyOn(
            authenticateUserStub,
            'execute'
        )
        await sut.handle(fakeData())
        expect(authenticateUserStubSpy).toHaveBeenCalledWith(fakeData().headers)
    })
})
