import { IHash } from '../../../helpers/hash/interfaces/IHash'
import { CreatedUser, CreateUserUseCaseDTO } from '../../../types/user'
import { IUseCase } from '../../IUseCase'
import { UserExists } from '../../../helpers/http/errors/userExists'
import { IGetUserEmailRepository } from '../../../repositories/user/intefaces/IGetUserEmailRepository'
import { IAddUserRepository } from '../../../repositories/user/intefaces/IAddUserRepository'

class CreateUserUseCase
    implements IUseCase<CreateUserUseCaseDTO, CreatedUser, UserExists>
{
    constructor(
        private readonly userRepository: IAddUserRepository,
        private readonly getUserEmailRepository: IGetUserEmailRepository,
        private readonly hasher: IHash
    ) {}

    async execute(
        data: CreateUserUseCaseDTO
    ): Promise<CreatedUser | UserExists> {
        const userExists = await this.getUserEmailRepository.getUserByEmail(
            data.email
        )
        if (userExists) {
            return new UserExists()
        }
        const hashPassword = await this.hasher.hash(data.password)
        const newUser = await this.userRepository.add(
            Object.assign({}, data, {
                password: hashPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        )

        const { password: _, ...user } = newUser
        return user
    }
}

export { CreateUserUseCase }
