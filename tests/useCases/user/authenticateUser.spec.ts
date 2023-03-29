import { describe, expect, test } from 'vitest'
import {
    AuthenticateUserUseCase,
    Header,
} from '../../../src/useCases/user/authenticateUser'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { CreatedUser } from '../../../src/types/user'
import { AuthenticationError } from '../../../src/helpers/http/errors/authenticationError'

type SutTypes = {
    sut: IUseCase<Header, CreatedUser, AuthenticationError>
}

const makeSut = (): SutTypes => {
    const sut = new AuthenticateUserUseCase()
    return { sut }
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
})
