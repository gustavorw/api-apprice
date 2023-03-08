import { describe, test, expect, afterAll, vi } from 'vitest'
import { IUserRepository } from '../../../repositories/user/IUserRepository'
import { UserRepository } from '../../../repositories/user/userRepository'
import { clientdB } from '../../../database/client'
import { CreateUserRepoDTO } from '../../../types/user'

const client = clientdB

const fakeData = (): CreateUserRepoDTO => {
    const addUser = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        price_hour: 10.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    return addUser
}

const makeSut = (): IUserRepository => {
    return new UserRepository(client)
}

describe('test user repository', () => {
    afterAll(async () => {
        await client.user.deleteMany({})
    })

    test('test add user', async () => {
        const sut = makeSut()
        const user = await sut.create(fakeData())

        expect(user).toBeTruthy()
        expect(user.id).toBeTruthy()
        expect(user.id).toBeTypeOf('number')
        expect(user.name).toBe('any_name')
        expect(user.email).toBe('any_email@mail.com')
        expect(user.password).toBe('any_password')
    })

    test('test get user by email', async () => {
        const sut = makeSut()
        const user = await sut.getUserByEmail('any_email@mail.com')
        expect(user).toBeTruthy()
    })
})
