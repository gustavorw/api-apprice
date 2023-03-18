import { describe, expect, test, vi } from 'vitest'
import { IHashCompare } from '../../../src/helpers/hash/interfaces/ICompare'
import { Hasher } from '../../../src/helpers/hash/bcryptAdapter'
import bcrypt from 'bcryptjs'

const makeSut = (): IHashCompare => {
    return new Hasher(12)
}

describe('test compare', () => {
    test('test call compare method of bcrypt with correct values', async () => {
        const sut = makeSut()
        const compareSpy = vi.spyOn(bcrypt, 'compare')
        await sut.compare('any_password', 'hash_password')
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'hash_password')
    })
})
