import { describe, expect, test, vi } from 'vitest'
import {
    AuthenticateUserUseCase,
    Header,
} from '../../../src/useCases/user/authenticateUser'
import { IDecrypt } from '../../../src/helpers/encrypt/interfaces/IDecrypt'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { CreatedUser } from '../../../src/types/user'
import { AuthenticationError } from '../../../src/helpers/http/errors/authenticationError'
import { IGetUserIdRepository } from '../../../src/repositories/user/intefaces/IGetUserIdRepository'

type SutTypes = {
    decrypterStub: IDecrypt
    getUserByEmailRepoStub: IGetUserIdRepository
    sut: IUseCase<Header, CreatedUser, AuthenticationError>
}

const dataUser = (): CreatedUser => ({
    id: 1,
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'hash_password',
    price_hour: 10.5,
    createdAt: new Date('2023-03-08T09:00'),
    updatedAt: new Date('2023-03-08T09:00'),
})

const makeGetUserIdRepository = (): IGetUserIdRepository => {
    class GetUserByEmailRepoStub implements IGetUserIdRepository {
        async getUserById(userId: number): Promise<CreatedUser | null> {
            return new Promise((resolve) => resolve(dataUser()))
        }
    }
    return new GetUserByEmailRepoStub()
}

const makeDecrypter = (): IDecrypt => {
    class Decrypter implements IDecrypt {
        async decrypt(token: string): Promise<string | number> {
            return new Promise((resolve) => resolve(1))
        }
    }
    return new Decrypter()
}

const makeSut = (): SutTypes => {
    const decrypterStub = makeDecrypter()
    const getUserByEmailRepoStub = makeGetUserIdRepository()
    const sut = new AuthenticateUserUseCase(
        decrypterStub,
        getUserByEmailRepoStub
    )
    return { sut, decrypterStub, getUserByEmailRepoStub }
}

describe('test authenticateUserUseCase', () => {
    test('test return authenticateError if not header provided', async () => {
        const { sut } = makeSut()
        const result = await sut.execute({})
        expect(result).toEqual(new AuthenticationError('Token not provided.'))
    })

    test('test return authenticateError if token length not equal to two', async () => {
        const { sut } = makeSut()
        const result = await sut.execute({ authorization: 'Bearerany_token' })
        expect(result).toEqual(new AuthenticationError('Invalid token.'))
    })

    test('test return authenticateError if token badly formatted', async () => {
        const { sut } = makeSut()
        const result = await sut.execute({ authorization: 'token any_token' })
        expect(result).toEqual(
            new AuthenticationError('Token badly formatted.')
        )
    })

    test('test call verify method of bcryptAdapter with correct value', async () => {
        const { sut, decrypterStub } = makeSut()
        const decrypterStubSpy = vi.spyOn(decrypterStub, 'decrypt')
        await sut.execute({ authorization: 'Bearer any_token' })
        expect(decrypterStubSpy).toHaveBeenCalledWith('any_token')
    })

    test('test return authenticateError if verify returns expired token message', async () => {
        const { sut, decrypterStub } = makeSut()
        vi.spyOn(decrypterStub, 'decrypt').mockReturnValue(
            new Promise<number | string>((resolve) => resolve('Expired token.'))
        )
        const result = await sut.execute({ authorization: 'Bearer any_token' })
        expect(result).toEqual(new AuthenticationError('Expired token.'))
    })

    test('test call getUserById method with correct value', async () => {
        const { sut, getUserByEmailRepoStub } = makeSut()
        const getUserByEmailRepoStubSpy = vi.spyOn(
            getUserByEmailRepoStub,
            'getUserById'
        )
        await sut.execute({ authorization: 'Bearer any_token' })
        expect(getUserByEmailRepoStubSpy).toHaveBeenCalledWith(1)
    })
})
