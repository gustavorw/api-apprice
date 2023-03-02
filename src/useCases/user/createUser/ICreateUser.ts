import { CreatedUser, UserSchema } from '../../../models/user'

interface ICreateUser {
    execute(data: UserSchema): Promise<CreatedUser>
}

export { ICreateUser }
