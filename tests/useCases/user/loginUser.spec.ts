import { describe, expect, test, vi } from 'vitest'
import { IGetUserEmailRepository } from '../../../src/repositories/user/intefaces/IGetUserEmailRepository'
import { CreatedUser } from '../../../src/types/user'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { LoginUserUseCase } from '../../../src/useCases/user/loginUser'

type SutTypes = {
    sut: IUseCase<any, any, any>
    getUserEmailRepositoryStub: IGetUserEmailRepository
}

const fakeDataInput = (): any[] => [
    {
        email: 'any_email@email.com',
        password: 'any_password',
    },
]

const fakeDataReturn = (): CreatedUser => ({
    id: 1,
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hash_password',
    price_hour: 10.5,
    createdAt: new Date('2023-03-08T09:00'),
    updatedAt: new Date('2023-03-08T09:00'),
})

const makeGetUserEmailRepository = (): IGetUserEmailRepository => {
    class GetUserEmailRepositoryStub implements IGetUserEmailRepository {
        getUserByEmail(email: string): Promise<CreatedUser | null> {
            return new Promise((resolve) => resolve(fakeDataReturn()))
        }
    }
    return new GetUserEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
    const getUserEmailRepositoryStub = makeGetUserEmailRepository()
    const sut = new LoginUserUseCase(getUserEmailRepositoryStub)
    return { sut, getUserEmailRepositoryStub }
}

describe('Test LoginUserUseCase', () => {
    test('test call getUserByEmail with correct values', async () => {
        const { sut, getUserEmailRepositoryStub } = makeSut()
        const getUserEmailRepositoryStubSpy = vi.spyOn(
            getUserEmailRepositoryStub,
            'getUserByEmail'
        )
        await sut.execute(fakeDataInput()[0])
        expect(getUserEmailRepositoryStubSpy).toHaveBeenCalledWith(
            fakeDataInput()[0]['email']
        )
    })
})
