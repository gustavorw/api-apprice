import { describe, test, expect, afterAll, vi, afterEach } from 'vitest'
import { UserRepository } from '../../../src/repositories/user/userRepository'
import { clientdB } from '../../../src/database/client'
import { CreateUserRepoDTO } from '../../../src/types/user'

const client = clientdB

const fakeData = (): CreateUserRepoDTO => ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    price_hour: 10.5,
    createdAt: new Date('2023-03-08T09:00'),
    updatedAt: new Date('2023-03-08T09:00'),
})

const userId = await client.user.create({
    data: {
        name: 'another_name',
        email: 'another_email@mail.com',
        password: 'another_password',
        price_hour: 10.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
})

const makeSut = (): UserRepository => {
    return new UserRepository(client)
}

describe('test addUserRepository', () => {
    afterAll(async () => {
        await client.user.deleteMany({})
    })

    test('test add user', async () => {
        const sut = makeSut()
        const user = await sut.add(fakeData())

        expect(user).toBeTruthy()
        expect(user.id).toBeTruthy()
        expect(user.id).toBeTypeOf('number')
        expect(user.name).toBe('any_name')
        expect(user.email).toBe('any_email@mail.com')
        expect(user.password).toBe('any_password')
    })

    test('test get user by email return null', async () => {
        const sut = makeSut()
        vi.spyOn(sut, 'getUserByEmail').mockReturnValue(
            new Promise((resolve) => resolve(null))
        )
        const user = await sut.getUserByEmail('any_email@mail.com')
        expect(user).toBeNull()
    })

    test('test get user by email return an user', async () => {
        const sut = makeSut()
        const user = await sut.getUserByEmail('any_email@mail.com')
        expect(user).toBeTruthy()
    })

    test('test get user by id return null', async () => {
        const sut = makeSut()
        vi.spyOn(sut, 'getUserById').mockReturnValue(
            new Promise((resolve) => resolve(null))
        )
        const user = await sut.getUserById(1)
        expect(user).toBeNull()
    })

    test('test get user by email return an user', async () => {
        const sut = makeSut()
        const user = await sut.getUserById(userId.id)
        expect(user).toBeTruthy()
        expect(user?.id).toBe(userId.id)
    })
})
