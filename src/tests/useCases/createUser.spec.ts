import { describe, expect, test, vi } from 'vitest'
import { IEncrypter } from '../../helpers/encrypter/IEncrypter'
import { UserSchema, CreatedUser } from '../../models/user'
import { IUserRepository } from '../../repositories/user/IUserRepository'
import { ICreateUser } from '../../useCases/user/createUser/ICreateUser'
import { CreateUserUseCase } from '../../useCases/user/createUser/createUser'

interface sutTypes {
    sut: ICreateUser
    encrypterStub: IEncrypter
    userRepositoryStub: IUserRepository
}

const makeEncrypter = (): IEncrypter => {
    class EncrypterStub implements IEncrypter {
        async hash(password: string): Promise<String> {
            return new Promise((resolve) => resolve('hash_password'))
        }
    }
    return new EncrypterStub()
}

const makeUserRepository = (): IUserRepository => {
    class UserRepositoryStub implements IUserRepository {
        async getUserByEmail(email: string): Promise<CreatedUser | null> {
            return new Promise((resolve) => resolve(null))
        }
        async create(data: UserSchema): Promise<CreatedUser> {
            const fake = {
                id: 1,
                name: 'any_name',
                email: 'any_email@email.com',
                price_hour: 10.5,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            return new Promise((resolve) => resolve(fake))
        }
    }
    return new UserRepositoryStub()
}

const dataInput = (): UserSchema[] => [
    {
        name: 'any_name',
        email: 'any_email@email.com',
        price_hour: 10.5,
        password: 'any_password',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: 'any_name',
        email: 'any_email@email.com',
        price_hour: 10.5,
        password: 'hash_password',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const makeSut = (): sutTypes => {
    const userRepositoryStub = makeUserRepository()
    const encrypterStub = makeEncrypter()
    const sut = new CreateUserUseCase(userRepositoryStub, encrypterStub)

    return { sut, encrypterStub, userRepositoryStub }
}

describe('test create user use case', () => {
    test('test call getUserByEmail method to verify user exist', async () => {
        const { sut, userRepositoryStub } = makeSut()

        const userRepositoryStubSpy = vi.spyOn(
            userRepositoryStub,
            'getUserByEmail'
        )

        await sut.execute(dataInput()[0])
        expect(userRepositoryStubSpy).toHaveBeenCalledWith(
            'any_email@email.com'
        )
    })

    test('test return error if user exist', async () => {
        const { sut, userRepositoryStub } = makeSut()

        vi.spyOn(userRepositoryStub, 'getUserByEmail').mockReturnValue(
            new Promise((resolve) =>
                resolve({
                    id: 1,
                    name: 'any_name',
                    email: 'any_email@email.com',
                    price_hour: 10.5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            )
        )

        const userExists = await sut.execute(dataInput()[0])
        expect(userExists).toEqual(
            new Error('Account with this email already exists!')
        )
    })

    test('test call hash password method', async () => {
        const { sut, encrypterStub } = makeSut()

        const encrypterSpy = vi.spyOn(encrypterStub, 'hash')

        await sut.execute(dataInput()[0])
        expect(encrypterSpy).toHaveBeenCalledWith('any_password')
    })

    test('test call create method of user repository', async () => {
        const { sut, userRepositoryStub } = makeSut()

        const userRepositoryStubSpy = vi.spyOn(userRepositoryStub, 'create')

        await sut.execute(dataInput()[1])
        expect(userRepositoryStubSpy).toHaveBeenCalledWith(dataInput()[1])
    })

    test('test return success create user', async () => {
        const { sut } = makeSut()

        const user = await sut.execute(dataInput()[1])
        expect(user).toEqual({
            id: 1,
            name: 'any_name',
            email: 'any_email@email.com',
            price_hour: 10.5,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    })
})
