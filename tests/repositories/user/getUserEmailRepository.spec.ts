import { describe, test, expect, afterAll, vi } from 'vitest'
import { UserRepository } from '../../../src/repositories/user/userRepository'
import { clientdB } from '../../../src/database/client'
import { CreateUserRepoDTO, CreatedUser } from '../../../src/types/user'
import { IAddUserRepository } from '../../../src/repositories/user/intefaces/IAddUserRepository'
import { IGetUserEmailRepository } from '../../../src/repositories/user/intefaces/IGetUserEmailRepository'

const client = clientdB

const fakeData = (): CreatedUser => ({
    id: 1,
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    price_hour: 10.5,
    createdAt: new Date('2023-03-08T09:00'),
    updatedAt: new Date('2023-03-08T09:00'),
})

const makeSut = (): IGetUserEmailRepository => {
    return new UserRepository(client)
}

describe('test getUserEmailRepository', () => {
    test('test get user by email return null', async () => {
        const sut = makeSut()
        vi.spyOn(sut, 'getUserByEmail').mockReturnValue(
            new Promise((resolve) => resolve(null))
        )
        const user = await sut.getUserByEmail('any_email@mail.com')
        expect(user).toBeNull()
    })

    test('test get user by email return a user', async () => {
        const sut = makeSut()
        vi.spyOn(sut, 'getUserByEmail').mockReturnValue(
            new Promise((resolve) => resolve(fakeData()))
        )
        const user = await sut.getUserByEmail('any_email@mail.com')
        expect(user).toBeTruthy()
    })
})
