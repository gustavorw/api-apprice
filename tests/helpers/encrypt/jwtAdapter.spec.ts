import { describe, expect, test, vi } from 'vitest'
import jwt from 'jsonwebtoken'
import { IEncrypt } from '../../../src/helpers/encrypt/interfaces/IEncrypt'
import { JwtAdapter } from '../../../src/helpers/encrypt/jwtAdapter'

const makeSut = (): IEncrypt => {
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
})
