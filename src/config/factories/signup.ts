import { SignupController } from '../../controllers/user/signupController'
import { clientdB } from '../../database/client'
import { Encrypter } from '../../helpers/encrypter/encrypterAdapter'
import { UserRepository } from '../../repositories/user/userRepository'
import { CreateUserUseCase } from '../../useCases/user/createUser/createUser'

const makeSignupController = (): SignupController => {
    const salt = 12
    const userRepository = new UserRepository(clientdB)
    const encrypter = new Encrypter(salt)
    const createUserUseCase = new CreateUserUseCase(userRepository, encrypter)
    return new SignupController(createUserUseCase)
}

export { makeSignupController }
