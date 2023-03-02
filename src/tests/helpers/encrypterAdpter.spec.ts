import { describe, test, expect, vi, afterEach, afterAll } from 'vitest'
import { Encrypter } from '../../helpers/encrypter/encrypterAdapter'
import bcrypt from 'bcryptjs'

const salt = 12
const makeSut = (): Encrypter => {
    return new Encrypter(salt)
}

describe('test encrypter adapter', () => {
    afterAll(() => {
        vi.resetAllMocks()
    })

    test('test call hash method with correct values', async () => {
        const sut = makeSut()
        const hashSpy = vi.spyOn(bcrypt, 'hash')
        await sut.hash('any_password')
        expect(hashSpy).toHaveBeenCalledWith('any_password', salt)
    })

    test('test return hashed password', async () => {
        const sut = makeSut()
        vi.spyOn(sut, 'hash').mockReturnValue(
            new Promise((resolve) => resolve('hash_password'))
        )
        const hashedPassword = await sut.hash('any_password')
        expect(hashedPassword).toBe('hash_password')
    })
})
