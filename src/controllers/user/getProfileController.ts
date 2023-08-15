import { serverError } from '../../helpers/http/responses'
import { httpRequest, httpResponse } from '../../types/http'
import { CreatedUser, UserId } from '../../types/user'
import { IUseCase } from '../../useCases/IUseCase'
import { IController } from '../IController'

class GetUserProfileController implements IController {
    constructor(
        private readonly getUserByIdRepository: IUseCase<
            UserId,
            CreatedUser,
            null
        >
    ) {}

    async handle(httpResquest: httpRequest): Promise<httpResponse> {
        try {
            await this.getUserByIdRepository.execute({
                userId: httpResquest.userId as number,
            })
            return { statusCode: 200, body: '' }
        } catch (error) {
            return serverError()
        }
    }
}

export { GetUserProfileController }
