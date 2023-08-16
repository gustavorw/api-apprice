import { IController } from '../../../controllers/IController'
import { GetUserProfileController } from '../../../controllers/user/getProfileController'
import { clientdB } from '../../../database/client'
import { UserRepository } from '../../../repositories/user/userRepository'
import { GetProfileUserUseCase } from '../../../useCases/user/getProfileUser'

const makeGetProfileController = (): IController => {
    const getUserByIdRepository = new UserRepository(clientdB)
    const getUserProfileUseCase = new GetProfileUserUseCase(
        getUserByIdRepository
    )
    return new GetUserProfileController(getUserProfileUseCase)
}

export { makeGetProfileController }
