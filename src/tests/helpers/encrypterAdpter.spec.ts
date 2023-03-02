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
    // finalizar teste
    // test('test return hashed password', async () => {
    //     const sut = makeSut()
    //     const hashedPassword = await sut.hash('any_password')
    //     expect(hashedPassword).toBe('hash')
    // })
})
