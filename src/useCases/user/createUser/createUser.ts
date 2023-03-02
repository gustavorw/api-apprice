import { IEncrypter } from '../../../helpers/encrypter/IEncrypter'
import { UserSchema, CreatedUser } from '../../../models/user'
import { IUserRepository } from '../../../repositories/user/IUserRepository'
import { ICreateUser } from './ICreateUser'

class CreateUserUseCase implements ICreateUser {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) {}

    async execute(data: UserSchema): Promise<CreatedUser> {
        const hashPassword = await this.encrypter.hash(data.password)
        const newUser = await this.userRepository.create(
            Object.assign({}, data, { password: hashPassword })
        )
        return newUser
    }
}

export { CreateUserUseCase }
