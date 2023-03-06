import { describe, expect, test, vi } from 'vitest'
import { SignupController } from '../../../controllers/user/signupController'
import { ICreateUser } from '../../../useCases/user/createUser/ICreateUser'
import { UserSchema, CreatedUser } from '../../../types/user'
import { IController } from '../../../controllers/IController'

describe('test SignupController', () => {
    type SutTypes = {
        sut: IController
        createUserUseCaseStub: ICreateUser
    }

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
        const data = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                price_hour: 10.5,
            },
        }
        await sut.handle(data)
        expect(createUserUseCaseStubSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            price_hour: 10.5,
        })
    })
})
