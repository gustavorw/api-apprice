import { describe, expect, test, vi } from 'vitest'
import { IGetUserEmailRepository } from '../../../src/repositories/user/intefaces/IGetUserEmailRepository'
import { CreatedUser, LoginUserDTO } from '../../../src/types/user'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { LoginUserUseCase } from '../../../src/useCases/user/loginUser'
import { AuthenticationError } from '../../../src/helpers/http/errors/authenticationError'
import { IHashCompare } from '../../../src/helpers/hash/interfaces/ICompare'
import { IEncrypt } from '../../../src/helpers/encrypt/interfaces/IEncrypt'

type SutTypes = {
    sut: IUseCase<LoginUserDTO, string, AuthenticationError>
    getUserEmailRepositoryStub: IGetUserEmailRepository
    hashCompareStub: IHashCompare
    encryptStub: IEncrypt
}

const fakeDataInput = (): LoginUserDTO => ({
    email: 'any_email@email.com',
    password: 'any_password',
})

const fakeDataReturn = (): CreatedUser => ({
    id: 1,
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hash_password',
    price_hour: 10.5,
    createdAt: new Date('2023-03-08T09:00'),
    updatedAt: new Date('2023-03-08T09:00'),
})

const makeHashCompare = (): IHashCompare => {
    class HashCompareStub implements IHashCompare {
        async compare(value: string, hash: string): Promise<boolean> {
            return new Promise((resolve) => resolve(true))
        }
    }
    return new HashCompareStub()
}

const makeEncrypt = (): IEncrypt => {
    class EncryptStub implements IEncrypt {
        encrypt(value: number): Promise<string> {
            return new Promise((resolve) => resolve('any_token'))
        }
    }
    return new EncryptStub()
}

const makeGetUserEmailRepository = (): IGetUserEmailRepository => {
    class GetUserEmailRepositoryStub implements IGetUserEmailRepository {
        async getUserByEmail(email: string): Promise<CreatedUser | null> {
            return new Promise((resolve) => resolve(fakeDataReturn()))
        }
    }
    return new GetUserEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
    const getUserEmailRepositoryStub = makeGetUserEmailRepository()
    const hashCompareStub = makeHashCompare()
    const encryptStub = makeEncrypt()
    const sut = new LoginUserUseCase(
        getUserEmailRepositoryStub,
        hashCompareStub,
        encryptStub
    )
    return { sut, getUserEmailRepositoryStub, hashCompareStub, encryptStub }
}

describe('Test LoginUserUseCase', () => {
    test('test call getUserByEmail with correct values', async () => {
        const { sut, getUserEmailRepositoryStub } = makeSut()
        const getUserEmailRepositoryStubSpy = vi.spyOn(
            getUserEmailRepositoryStub,
            'getUserByEmail'
        )
        await sut.execute(fakeDataInput())
        expect(getUserEmailRepositoryStubSpy).toHaveBeenCalledWith(
            fakeDataInput().email
        )
    })

    test('test return authentication error if user not exists', async () => {
        const { sut, getUserEmailRepositoryStub } = makeSut()
        vi.spyOn(getUserEmailRepositoryStub, 'getUserByEmail').mockReturnValue(
            new Promise((resolve) => resolve(null))
        )

        const user = await sut.execute(fakeDataInput())
        expect(user).toEqual(new AuthenticationError('Wrong email.'))
    })

    test('test call compare with correct values', async () => {
        const { sut, hashCompareStub } = makeSut()
        const hashCompareStubSpy = vi.spyOn(hashCompareStub, 'compare')
        await sut.execute(fakeDataInput())
        expect(hashCompareStubSpy).toHaveBeenCalledWith(
            fakeDataInput().password,
            'hash_password'
        )
    })

    test('test return authentication error if hashCompare return false', async () => {
        const { sut, hashCompareStub } = makeSut()
        vi.spyOn(hashCompareStub, 'compare').mockReturnValue(
            new Promise((resolve) => resolve(false))
        )

        const user = await sut.execute(fakeDataInput())
        expect(user).toEqual(new AuthenticationError('Wrong Password.'))
    })

    test('test call encrpyt method if user exists', async () => {
        const { sut, encryptStub } = makeSut()
        const encryptStubSpy = vi.spyOn(encryptStub, 'encrypt')
        await sut.execute(fakeDataInput())
        expect(encryptStubSpy).toHaveBeenCalledWith(fakeDataReturn()['id'])
    })

    test('test return an token success', async () => {
        const { sut } = makeSut()
        const token = await sut.execute(fakeDataInput())
        expect(token).toBe('any_token')
    })
})
