import { SignupController } from '../../controllers/user/signupController'
import { clientdB } from '../../database/client'
import { Hasher } from '../../helpers/hash/bcryptAdapter'
import { IAddUserRepository } from '../../repositories/user/intefaces/IAddUserRepository'
import { IGetUserEmailRepository } from '../../repositories/user/intefaces/IGetUserEmailRepository'
import { UserRepository } from '../../repositories/user/userRepository'
import { CreateUserUseCase } from '../../useCases/user/createUser/createUser'

const makeSignupController = (): SignupController => {
    const salt = 12
    const userRepository = new UserRepository(clientdB)
    const hasher = new Hasher(salt)
    const createUserUseCase = new CreateUserUseCase(
        userRepository as IAddUserRepository,
        userRepository as IGetUserEmailRepository,
        hasher
    )
    return new SignupController(createUserUseCase)
}

export { makeSignupController }
