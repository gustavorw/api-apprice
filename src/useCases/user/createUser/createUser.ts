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
        await this.userRepository.create(
            Object.assign({}, data, { password: hashPassword })
        )

        const user = {
            id: 1,
            name: 'any_name',
            email: 'any_email@email.com',
            price_hour: 10.5,
        }
        return new Promise((resolve) => resolve(user))
    }
}

export { CreateUserUseCase }
