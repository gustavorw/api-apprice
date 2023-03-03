import { CreatedUser, UserSchema } from '../../../models/user'

interface ICreateUser {
    execute(data: UserSchema): Promise<CreatedUser | Error>
}

export { ICreateUser }
