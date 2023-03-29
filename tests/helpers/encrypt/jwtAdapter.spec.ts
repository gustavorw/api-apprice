import { describe, expect, test, vi } from 'vitest'
import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/helpers/encrypt/jwtAdapter'

const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

describe('test jwtAdapter', () => {
    test('test call sign method of jwt with correct values', async () => {
        const sut = makeSut()
        const signSpy = vi.spyOn(jwt, 'sign')
        await sut.encrypt(1)
        expect(signSpy).toHaveBeenCalledWith({ id: 1 }, 'secret', {
            expiresIn: '1d',
        })
    })

    test('test return token success', async () => {
        const sut = makeSut()
        vi.spyOn(jwt, 'sign').mockImplementation(() => {
            return 'any_token'
        })
        const token = await sut.encrypt(1)
        expect(token).toBe('any_token')
    })

    test('test call verify method of jwt with correct values', async () => {
        const sut = makeSut()
        const verifySpy = vi.spyOn(jwt, 'verify').mockReturnValue()
        await sut.decrypt('any_token')
        expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('test return a value on verify success', async () => {
        const sut = makeSut()
        vi.spyOn(jwt, 'verify').mockReturnValue({ id: 1 } as any)

        const value = await sut.decrypt('any_token')
        expect(value).toEqual(1)
    })
})
