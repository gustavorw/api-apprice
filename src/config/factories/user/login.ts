import { LoginController } from '../../../controllers/user/loginController'
import { clientdB } from '../../../database/client'
import { JwtAdapter } from '../../../helpers/encrypt/jwtAdapter'
import { BcryptAdapter } from '../../../helpers/hash/bcryptAdapter'
import { UserRepository } from '../../../repositories/user/userRepository'
import { LoginUserUseCase } from '../../../useCases/user/loginUser'

const makeLoginController = (): LoginController => {
    const salt = 12
    const getUserEmailRepository = new UserRepository(clientdB)
    const hashCompare = new BcryptAdapter(salt)
    const encrypter = new JwtAdapter('çKjfowief989fj!*@hn')
    const loginUserUseCase = new LoginUserUseCase(
        getUserEmailRepository,
        hashCompare,
        encrypter
    )
    return new LoginController(loginUserUseCase)
}

export { makeLoginController }
