import { UserExists } from '../../../helpers/http/userExists'
import {
    CreateUserUseCaseDTO,
    CreatedUser,
    UserSchema,
} from '../../../types/user'

interface ICreateUser {
    execute(data: CreateUserUseCaseDTO): Promise<CreatedUser | UserExists>
}

export { ICreateUser }
