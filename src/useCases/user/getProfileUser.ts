import { IGetUserIdRepository } from '../../repositories/user/intefaces/IGetUserIdRepository'
import { CreatedUser, UserId } from '../../types/user'
import { IUseCase } from '../IUseCase'

class GetProfileUserUseCase implements IUseCase<UserId, CreatedUser, null> {
    constructor(private readonly getUserByIdRepository: IGetUserIdRepository) {}

    async execute(data: UserId): Promise<CreatedUser | null> {
        const getUser = await this.getUserByIdRepository.getUserById(
            data.userId
        )
        const { password: _, ...user } = getUser
        return user
    }
}

export { GetProfileUserUseCase }
