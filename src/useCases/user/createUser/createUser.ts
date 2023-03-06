import { IEncrypter } from '../../../helpers/encrypter/IEncrypter'
import { UserSchema, CreatedUser } from '../../../types/user'
import { IUserRepository } from '../../../repositories/user/IUserRepository'
import { ICreateUser } from './ICreateUser'

class CreateUserUseCase implements ICreateUser {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) {}

    async execute(data: UserSchema): Promise<CreatedUser | Error> {
        const userExists = await this.userRepository.getUserByEmail(data.email)
        if (userExists) {
            return new Error(
                'Account with this email already exists! Try with another email!'
            )
        }
        const hashPassword = await this.encrypter.hash(data.password)
        const newUser = await this.userRepository.create(
            Object.assign({}, data, {
                password: hashPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        )
        return newUser
    }
}

export { CreateUserUseCase }
