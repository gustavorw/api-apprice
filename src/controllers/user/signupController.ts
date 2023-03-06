import { badRequest } from '../../helpers/http/errors'
import { httpRequest, httpResponse } from '../../types/http'
import { ICreateUser } from '../../useCases/user/createUser/ICreateUser'
import { IController } from '../IController'

class SignupController implements IController {
    constructor(private readonly createUserUseCase: ICreateUser) {}

    async handle(httpResquest: httpRequest): Promise<httpResponse> {
        const user = await this.createUserUseCase.execute(httpResquest.body)
        if (user instanceof Error) {
            return badRequest(user.message)
        }
        return {
            statusCode: 200,
            body: '',
        }
    }
}

export { SignupController }
