import { describe, expect, test, vi } from 'vitest'
import { SignupController } from '../../../src/controllers/user/signupController'
import { IUseCase } from '../../../src/useCases/IUseCase'
import {
    CreatedUser,
    CreateUserRepoDTO,
    CreateUserUseCaseDTO,
} from '../../../src/types/user'
import { IController } from '../../../src/controllers/IController'
import { httpRequest } from '../../../src/types/http'
import { UserExists } from '../../../src/helpers/http/errors/userExists'
import {
    badRequest,
    created,
    serverError,
} from '../../../src/helpers/http/responses'

type SutTypes = {
    sut: IController
    createUserUseCaseStub: IUseCase<CreateUserRepoDTO, CreatedUser, UserExists>
}

const fakeData = (): httpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        price_hour: 10.5,
    },
})

const returnData = (): CreatedUser => ({
    id: 1,
    name: 'any_name',
    email: 'any_email@email.com',
    price_hour: 10.5,
    createdAt: new Date('2023-03-08T09:00'),
    updatedAt: new Date('2023-03-08T09:00'),
})

const makeCreateUserUseCase = (): IUseCase<
    CreateUserRepoDTO,
    CreatedUser,
    UserExists
> => {
    class CreateUserUseCaseStub
        implements IUseCase<CreateUserRepoDTO, CreatedUser, UserExists>
    {
        execute(data: CreateUserUseCaseDTO): Promise<CreatedUser | UserExists> {
            return new Promise((resolve) => resolve(returnData()))
        }
    }
    return new CreateUserUseCaseStub()
}

const makeSut = (): SutTypes => {
    const createUserUseCaseStub = makeCreateUserUseCase()
    const sut = new SignupController(createUserUseCaseStub)
    return { createUserUseCaseStub, sut }
}

describe('test SignupController', () => {
    test('test call execute method with values', async () => {
        const { sut, createUserUseCaseStub } = makeSut()
        const createUserUseCaseStubSpy = vi.spyOn(
            createUserUseCaseStub,
            'execute'
        )

        await sut.handle(fakeData())
        expect(createUserUseCaseStubSpy).toHaveBeenCalledWith(fakeData().body)
    })

    test('test return status 400 if an account with email already exist', async () => {
        const { sut, createUserUseCaseStub } = makeSut()
        vi.spyOn(createUserUseCaseStub, 'execute').mockReturnValue(
            new Promise<CreatedUser | UserExists>((resolve) =>
                resolve(new UserExists())
            )
        )

        const httpResponse = await sut.handle(fakeData())
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(
            badRequest(new UserExists().message).body
        )
    })

    test('test return status 500 if createUserUseCase raise exception', async () => {
        const { sut, createUserUseCaseStub } = makeSut()
        vi.spyOn(createUserUseCaseStub, 'execute').mockImplementationOnce(
            async () =>
                new Promise<CreatedUser | UserExists>((resolve, reject) =>
                    reject(new Error())
                )
        )

        const httpResponse = await sut.handle(fakeData())
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(serverError().body)
    })

    test('test return status 201 with correct values', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(fakeData())
        expect(httpResponse.statusCode).toBe(201)
        expect(httpResponse.body).toEqual(created(returnData()).body)
    })
})
