import { describe, expect, test, vi } from 'vitest'
import { SignupController } from '../../../controllers/user/signupController'
import { ICreateUser } from '../../../useCases/user/createUser/ICreateUser'
import {
    UserSchema,
    CreatedUser,
    CreateUserUseCaseDTO,
} from '../../../types/user'
import { IController } from '../../../controllers/IController'
import { httpRequest } from '../../../types/http'
import { ServerError } from '../../../helpers/http/serverError'
import { UserExists } from '../../../helpers/http/userExists'

type SutTypes = {
    sut: IController
    createUserUseCaseStub: ICreateUser
}

const fakeData = (): httpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        price_hour: 10.5,
    },
})

const makeCreateUserUseCase = (): ICreateUser => {
    class CreateUserUseCaseStub implements ICreateUser {
        execute(data: CreateUserUseCaseDTO): Promise<CreatedUser | UserExists> {
            const fakeAccount = {
                id: 1,
                name: 'any_name',
                email: 'any_email@email.com',
                price_hour: 10.5,
                createdAt: new Date('2023-03-08T09:00'),
                updatedAt: new Date('2023-03-08T09:00'),
            }
            return new Promise((resolve) => resolve(fakeAccount))
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

    test('test return status 400 if account email already exist', async () => {
        const { sut, createUserUseCaseStub } = makeSut()
        vi.spyOn(createUserUseCaseStub, 'execute').mockReturnValue(
            new Promise<CreatedUser | UserExists>((resolve) =>
                resolve(new UserExists())
            )
        )

        const httpResponse = await sut.handle(fakeData())
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            message: new UserExists().message,
        })
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
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('test return status 201 with correct values', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(fakeData())
        expect(httpResponse.statusCode).toBe(201)
        expect(httpResponse.body).toEqual({
            id: 1,
            name: 'any_name',
            email: 'any_email@email.com',
            price_hour: 10.5,
            createdAt: new Date('2023-03-08T09:00'),
            updatedAt: new Date('2023-03-08T09:00'),
        })
    })
})
