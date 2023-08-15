import { describe, expect, test, vi } from 'vitest'
import { IController } from '../../../src/controllers/IController'
import { IUseCase } from '../../../src/useCases/IUseCase'
import { CreatedUser, UserId } from '../../../src/types/user'
import { GetUserProfileController } from '../../../src/controllers/user/getProfileController'

type SutType = {
    sut: IController
    getProfileUserUseCaseStub: IUseCase<UserId, CreatedUser, null>
}

const data = (): UserId => ({
    userId: 1,
})

const makeGetProfileUser = (): IUseCase<UserId, CreatedUser, null> => {
    class GetProfileUserUseCaseStub
        implements IUseCase<UserId, CreatedUser, null>
    {
        async execute(data: UserId): Promise<CreatedUser | null> {
            return new Promise((resolve) =>
                resolve({
                    id: 1,
                    name: 'any_name',
                    email: 'any_email@email.com',
                    price_hour: 10.5,
                    createdAt: new Date('2023-03-08T09:00'),
                    updatedAt: new Date('2023-03-08T09:00'),
                })
            )
        }
    }

    return new GetProfileUserUseCaseStub()
}

const makeSut = (): SutType => {
    const getProfileUserUseCaseStub = makeGetProfileUser()
    const sut = new GetUserProfileController(getProfileUserUseCaseStub)

    return {
        sut,
        getProfileUserUseCaseStub,
    }
}

describe('test get user profile controller', () => {
    test('test call execute method with correc value', async () => {
        const { sut, getProfileUserUseCaseStub } = makeSut()

        const getProfileUserUseCaseStubSpy = vi.spyOn(
            getProfileUserUseCaseStub,
            'execute'
        )

        await sut.handle(data())
        expect(getProfileUserUseCaseStubSpy).toHaveBeenLastCalledWith(data())
    })
})
