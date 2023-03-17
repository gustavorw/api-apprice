import { describe, expect, test, vi } from 'vitest'
import { IHash } from '../../../src/helpers/hash/interfaces/IHash'
import { CreatedUser, CreateUserRepoDTO } from '../../../src/types/user'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { CreateUserUseCase } from '../../../src/useCases/user/createUser/createUser'
import { UserExists } from '../../../src/helpers/http/errors/userExists'
import { IAddUserRepository } from '../../../src/repositories/user/intefaces/IAddUserRepository'
import { IGetUserEmailRepository } from '../../../src/repositories/user/intefaces/IGetUserEmailRepository'

interface sutTypes {
    sut: IUseCase<CreateUserRepoDTO, CreatedUser, UserExists>
    hasherStub: IHash
    addUserRepositoryStub: IAddUserRepository
    getUserEmailRepositoryStub: IGetUserEmailRepository
}

const makeHasher = (): IHash => {
    class hasherStub implements IHash {
        async hash(password: string): Promise<String> {
            return new Promise((resolve) => resolve('hash_password'))
        }
    }
    return new hasherStub()
}

const makeGetUserEmailRepository = (): IGetUserEmailRepository => {
    class GetUserEmailRepositoryStub implements IGetUserEmailRepository {
        getUserByEmail(email: string): Promise<CreatedUser | null> {
            return new Promise((resolve) => resolve(null))
        }
    }
    return new GetUserEmailRepositoryStub()
}

const makeAddUserRepository = (): IAddUserRepository => {
    class AddUserRepositoryStub implements IAddUserRepository {
        async add(data: CreateUserRepoDTO): Promise<CreatedUser> {
            const fake = {
                id: 1,
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'hash_password',
                price_hour: 10.5,
                createdAt: new Date('2023-03-08T09:00'),
                updatedAt: new Date('2023-03-08T09:00'),
            }
            return new Promise((resolve) => resolve(fake))
        }
    }
    return new AddUserRepositoryStub()
}

const dataInput = (): any[] => [
    {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        price_hour: 10.5,
    },
    {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hash_password',
        price_hour: 10.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const makeSut = (): sutTypes => {
    const addUserRepositoryStub = makeAddUserRepository()
    const hasherStub = makeHasher()
    const getUserEmailRepositoryStub = makeGetUserEmailRepository()
    const sut = new CreateUserUseCase(
        addUserRepositoryStub,
        getUserEmailRepositoryStub,
        hasherStub
    )

    return {
        sut,
        hasherStub,
        getUserEmailRepositoryStub,
        addUserRepositoryStub,
    }
}

describe('test createUserUseCase', () => {
    test('test call getUserByEmail method to verify user exist', async () => {
        const { sut, getUserEmailRepositoryStub } = makeSut()

        const userRepositoryStubSpy = vi.spyOn(
            getUserEmailRepositoryStub,
            'getUserByEmail'
        )

        await sut.execute(dataInput()[0])
        expect(userRepositoryStubSpy).toHaveBeenCalledWith(
            dataInput()[0]['email']
        )
    })

    test('test return error if user exist', async () => {
        const { sut, getUserEmailRepositoryStub } = makeSut()

        vi.spyOn(getUserEmailRepositoryStub, 'getUserByEmail').mockReturnValue(
            new Promise((resolve) =>
                resolve({
                    id: 1,
                    name: 'any_name',
                    email: 'any_email@email.com',
                    price_hour: 10.5,
                    createdAt: new Date('2023-03-08T09:00'),
                    updatedAt: new Date('2023-03-08T09:00'),
                })
            )
        )

        const userExists = await sut.execute(dataInput()[0])
        expect(userExists).toEqual(new UserExists())
    })

    test('test call hash password method', async () => {
        const { sut, hasherStub } = makeSut()

        const encrypterSpy = vi.spyOn(hasherStub, 'hash')

        await sut.execute(dataInput()[0])
        expect(encrypterSpy).toHaveBeenCalledWith('any_password')
    })

    test('test call add method of addUserRepository', async () => {
        const { sut, addUserRepositoryStub } = makeSut()

        const addUserRepositoryStubSpy = vi.spyOn(addUserRepositoryStub, 'add')

        await sut.execute(dataInput()[1])
        expect(addUserRepositoryStubSpy).toHaveBeenCalledWith(dataInput()[1])
    })

    test('test return success create user', async () => {
        const { sut } = makeSut()

        const user = await sut.execute(dataInput()[1])
        expect(user).toEqual({
            id: 1,
            name: 'any_name',
            email: 'any_email@email.com',
            price_hour: 10.5,
            createdAt: new Date('2023-03-08T09:00'),
            updatedAt: new Date('2023-03-08T09:00'),
        })
    })
})
