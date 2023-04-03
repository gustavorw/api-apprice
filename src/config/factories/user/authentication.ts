import { clientdB } from '../../../database/client'
import { JwtAdapter } from '../../../helpers/encrypt/jwtAdapter'
import { UserRepository } from '../../../repositories/user/userRepository'
import { AuthenticateUserUseCase } from '../../../useCases/user/authenticateUser'
import env from '../../env'
import { IMiddleware } from '../../middlewares/inputDataValidation/IMiddleware'
import { AuthMiddleware } from '../../middlewares/inputDataValidation/user/authMiddleware'

const makeAuthMiddleware = (): IMiddleware => {
    const decrypter = new JwtAdapter(env.secret_key)
    const getUserIdRepository = new UserRepository(clientdB)
    const authenticationUseCase = new AuthenticateUserUseCase(
        decrypter,
        getUserIdRepository
    )
    return new AuthMiddleware(authenticationUseCase)
}

export { makeAuthMiddleware }
