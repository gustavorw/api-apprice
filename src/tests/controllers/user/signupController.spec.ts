import { describe, expect, test, vi } from 'vitest'
import { SignupController } from '../../../controllers/user/signupController'
import { ICreateUser } from '../../../useCases/user/createUser/ICreateUser'
import { UserSchema, CreatedUser } from '../../../types/user'
import { IController } from '../../../controllers/IController'
import { httpRequest } from '../../../types/http'

describe('test SignupController', () => {
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
            execute(data: UserSchema): Promise<CreatedUser | Error> {
                const fakeAccount = {
                    id: 1,
                    name: 'any_name',
                    email: 'any_email@email.com',
                    price_hour: 10.5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
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

    test('test call execute method with values', async () => {
        const { sut, createUserUseCaseStub } = makeSut()
        const createUserUseCaseStubSpy = vi.spyOn(
            createUserUseCaseStub,
            'execute'
        )

        await sut.handle(fakeData())
        expect(createUserUseCaseStubSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            price_hour: 10.5,
        })
    })

    test('test return status 400 if email already exists', async () => {
        const { sut, createUserUseCaseStub } = makeSut()

        vi.spyOn(createUserUseCaseStub, 'execute').mockReturnValue(
            new Promise((reject) =>
                reject(
                    new Error(
                        'Account with this email already exists! Try with another email!'
                    )
                )
            )
        )

        const httpResponse = await sut.handle(fakeData())
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            error: 'Account with this email already exists! Try with another email!',
        })
    })

    test('test retun status 201 with correct values', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(fakeData())
        expect(httpResponse.statusCode).toBe(201)
        expect(httpResponse.body).toEqual({
            id: 1,
            name: 'any_name',
            email: 'any_email@email.com',
            price_hour: 10.5,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    })
})
