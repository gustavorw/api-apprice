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
    sut: IUseCase<Header, CreatedUser, AuthenticationError>
}

const makeDecrypter = (): IDecrypt => {
    class Decrypter implements IDecrypt {
        async decrypt(token: string): Promise<string | number> {
            return new Promise((resolve) => resolve({ id: 1 } as any))
        }
    }
    return new Decrypter()
}

const makeSut = (): SutTypes => {
    const decrypterStub = makeDecrypter()
    const sut = new AuthenticateUserUseCase(decrypterStub)
    return { sut, decrypterStub }
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
})
