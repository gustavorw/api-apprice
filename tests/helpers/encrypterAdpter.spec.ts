import { describe, test, expect, vi, afterAll } from 'vitest'
import { Hasher } from '../../src/helpers/hash/bcryptAdapter'
import bcrypt from 'bcryptjs'
import { IHash } from '../../src/helpers/hash/interfaces/IHash'

const salt = 12
const makeSut = (): IHash => {
    return new Hasher(salt)
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
