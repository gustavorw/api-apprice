import { IEncrypter } from '../../../helpers/encrypter/IEncrypter'
import { CreatedUser, CreateUserUseCaseDTO } from '../../../types/user'
import { IUserRepository } from '../../../repositories/user/IUserRepository'
import { IUseCase } from '../../IUseCase'
import { UserExists } from '../../../helpers/http/userExists'

class CreateUserUseCase
    implements IUseCase<CreateUserUseCaseDTO, CreatedUser, UserExists>
{
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) {}

    async execute(
        data: CreateUserUseCaseDTO
    ): Promise<CreatedUser | UserExists> {
        const userExists = await this.userRepository.getUserByEmail(data.email)
        if (userExists) {
            return new UserExists()
        }
        const hashPassword = await this.encrypter.hash(data.password)
        const newUser = await this.userRepository.create(
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
