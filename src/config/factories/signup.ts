import { SignupController } from '../../controllers/user/signupController'
import { clientdB } from '../../database/client'
import { BcryptAdapter } from '../../helpers/hash/bcryptAdapter'
import { IAddUserRepository } from '../../repositories/user/intefaces/IAddUserRepository'
import { IGetUserEmailRepository } from '../../repositories/user/intefaces/IGetUserEmailRepository'
import { UserRepository } from '../../repositories/user/userRepository'
import { CreateUserUseCase } from '../../useCases/user/createUser'

const makeSignupController = (): SignupController => {
    const salt = 12
    const userRepository = new UserRepository(clientdB)
    const bcryptAdapter = new BcryptAdapter(salt)
    const createUserUseCase = new CreateUserUseCase(
        userRepository as IAddUserRepository,
        userRepository as IGetUserEmailRepository,
        bcryptAdapter
    )
    return new SignupController(createUserUseCase)
}

export { makeSignupController }
