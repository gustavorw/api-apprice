import { describe, test, expect, vi, afterAll } from 'vitest'
import { BcryptAdapter } from '../../../src/helpers/hash/bcryptAdapter'
import bcrypt from 'bcryptjs'

const salt = 12
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('test bcryptAdapter', () => {
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

    test('test call compare method of bcrypt with correct values', async () => {
        const sut = makeSut()
        const compareSpy = vi.spyOn(bcrypt, 'compare')
        await sut.compare('any_password', 'hash_password')
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'hash_password')
    })

    test('test return true', async () => {
        const sut = makeSut()
        vi.spyOn(sut, 'compare').mockReturnValue(
            new Promise((resolve) => resolve(true))
        )
        const isEqual = await sut.compare('any_password', 'hash_password')
        expect(isEqual).toBeTruthy()
    })
})
