import { ok, serverError } from '../../helpers/http/responses'
import { httpRequest, httpResponse } from '../../types/http'
import { CreatedUser, UserId } from '../../types/user'
import { IUseCase } from '../../useCases/IUseCase'
import { IController } from '../IController'

class GetUserProfileController implements IController {
    constructor(
        private readonly getUserProfileUseCase: IUseCase<
            UserId,
            CreatedUser,
            null
        >
    ) {}

    async handle(httpResquest: httpRequest): Promise<httpResponse> {
        try {
            const httpResponse = await this.getUserProfileUseCase.execute({
                userId: httpResquest.userId as number,
            })
            return ok(httpResponse)
        } catch (error) {
            return serverError()
        }
    }
}

export { GetUserProfileController }
