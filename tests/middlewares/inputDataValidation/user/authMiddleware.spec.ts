import { describe, expect, test, vi } from 'vitest'
import { AuthMiddleware } from '../../../../src/config/middlewares/inputDataValidation/user/authMiddleware'
import { IUseCase } from '../../../../src/useCases/IUseCase'
import { IMiddleware } from '../../../../src/config/middlewares/inputDataValidation/IMiddleware'
import { CreatedUser, Header } from '../../../../src/types/user'
import { AuthenticationError } from '../../../../src/helpers/http/errors/authenticationError'
import { unauthorized } from '../../../../src/helpers/http/responses'

const fakeData = () => ({
    headers: {
        authorization: 'Bearer any_token',
    },
})

type SutTypes = {
    sut: IMiddleware
    authenticateUserStub: IUseCase<Header, CreatedUser, AuthenticationError>
}

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

const makeSut = (): SutTypes => {
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

    test('test return unauthorized if not headers', async () => {
        const { sut, authenticateUserStub } = makeSut()
        vi.spyOn(authenticateUserStub, 'execute').mockReturnValue(
            new Promise((resolve) =>
                resolve(new AuthenticationError('Token not provided.'))
            )
        )
        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(
            unauthorized('Token not provided.').body
        )
    })

    test('test return unauthorized if token not devided in two parts', async () => {
        const { sut, authenticateUserStub } = makeSut()
        vi.spyOn(authenticateUserStub, 'execute').mockReturnValue(
            new Promise((resolve) =>
                resolve(new AuthenticationError('Invalid token.'))
            )
        )
        const httpResponse = await sut.handle({
            headers: {
                authorization: 'Bearerany_token',
            },
        })
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(unauthorized('Invalid token.').body)
    })
})
