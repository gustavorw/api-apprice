import { describe, expect, test, vi } from 'vitest'
import { IGetUserIdRepository } from '../../../src/repositories/user/intefaces/IGetUserIdRepository'
import { CreatedUser, UserId } from '../../../src/types/user'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { UserNotExists } from '../../../src/helpers/http/errors/userNotExists'
import { GetProfileUserUseCase } from '../../../src/useCases/user/getProfileUser'

type SutTypes = {
    getUserByEmailRepoStub: IGetUserIdRepository
    sut: IUseCase<UserId, CreatedUser, UserNotExists>
}

const makeGetUserIdRepository = (): IGetUserIdRepository => {
    class GetUserByEmailRepoStub implements IGetUserIdRepository {
        async getUserById(userId: number): Promise<CreatedUser | null> {
            return new Promise((resolve) =>
                resolve({
                    id: 1,
                    name: 'any_name',
                    email: 'any_email@email.com',
                    password: 'hash_password',
                    price_hour: 10.5,
                    createdAt: new Date('2023-03-08T09:00'),
                    updatedAt: new Date('2023-03-08T09:00'),
                })
            )
        }
    }

    return new GetUserByEmailRepoStub()
}

const dataUser = (): UserId => ({
    userId: 1,
})

const makeSut = (): SutTypes => {
    const getUserByEmailRepoStub = makeGetUserIdRepository()
    const sut = new GetProfileUserUseCase(getUserByEmailRepoStub)

    return {
        sut,
        getUserByEmailRepoStub,
    }
}

describe('test get profileUserUseCase', () => {
    test('test call getUserById method', async () => {
        const { sut, getUserByEmailRepoStub } = makeSut()
        const getUserByEmailRepoStubSpy = vi.spyOn(
            getUserByEmailRepoStub,
            'getUserById'
        )

        await sut.execute(dataUser())
        expect(getUserByEmailRepoStubSpy).toHaveBeenCalledWith(
            dataUser()['userId']
        )
    })
})
