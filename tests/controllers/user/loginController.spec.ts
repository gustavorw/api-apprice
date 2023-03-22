import { describe, expect, test, vi } from 'vitest'
import { httpRequest } from '../../../src/types/http'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { IController } from '../../../src/controllers/IController'
import { LoginUserDTO } from '../../../src/types/user'
import { AuthenticationError } from '../../../src/helpers/http/errors/authenticationError'
import { LoginController } from '../../../src/controllers/user/loginController'

type SutTypes = {
    sut: IController
    loginUserUseCaseStub: IUseCase<LoginUserDTO, string, AuthenticationError>
}

const fakeData = (): httpRequest => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password',
    },
})

const makeLoginUserUseCase = (): IUseCase<
    LoginUserDTO,
    string,
    AuthenticationError
> => {
    class LoginUserUseCaseStub
        implements IUseCase<LoginUserDTO, string, AuthenticationError>
    {
        async execute(
            data: LoginUserDTO
        ): Promise<string | AuthenticationError> {
            return new Promise((resolve) => resolve('any_token'))
        }
    }
    return new LoginUserUseCaseStub()
}

const makeSut = (): SutTypes => {
    const loginUserUseCaseStub = makeLoginUserUseCase()
    const sut = new LoginController(loginUserUseCaseStub)
    return {
        loginUserUseCaseStub,
        sut,
    }
}

describe('test loginController', () => {
    test('test call excute method of loginUserUseCase', async () => {
        const { sut, loginUserUseCaseStub } = makeSut()
        const loginUserUseCaseStubSpy = vi.spyOn(
            loginUserUseCaseStub,
            'execute'
        )
        await sut.handle(fakeData())
        expect(loginUserUseCaseStubSpy).toHaveBeenCalledWith(fakeData().body)
    })
})
