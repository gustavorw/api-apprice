import { badRequest, created, serverError } from '../../helpers/http/errors'
import { UserExists } from '../../helpers/http/userExists'
import { httpRequest, httpResponse } from '../../types/http'
import { CreateUserRepoDTO, CreatedUser } from '../../types/user'
import { IUseCase } from '../../useCases/IUseCase'
import { IController } from '../IController'

class SignupController implements IController {
    constructor(
        private readonly createUserUseCase: IUseCase<
            CreateUserRepoDTO,
            CreatedUser,
            UserExists
        >
    ) {}

    async handle(httpResquest: httpRequest): Promise<httpResponse> {
        try {
            const user = await this.createUserUseCase.execute(httpResquest.body)
            if (user instanceof UserExists) {
                return badRequest(user.message)
            }
            return created(user)
        } catch (error) {
            // console.log(error)
            return serverError()
        }
    }
}

export { SignupController }
