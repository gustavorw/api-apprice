import { UserNotExists } from '../../helpers/http/errors/userNotExists'
import { IGetUserIdRepository } from '../../repositories/user/intefaces/IGetUserIdRepository'
import { CreatedUser, UserId } from '../../types/user'
import { IUseCase } from '../IUseCase'

class GetProfileUserUseCase
    implements IUseCase<UserId, CreatedUser, UserNotExists>
{
    constructor(private readonly getUserByIdRepository: IGetUserIdRepository) {}

    async execute(data: UserId): Promise<CreatedUser | UserNotExists> {
        await this.getUserByIdRepository.getUserById(data.userId)
        return {
            id: 1,
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'hash_password',
            price_hour: 10.5,
            createdAt: new Date('2023-03-08T09:00'),
            updatedAt: new Date('2023-03-08T09:00'),
        }
    }
}

export { GetProfileUserUseCase }
