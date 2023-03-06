import { CreatedUser, UserSchema } from '../../../types/user'

interface ICreateUser {
    execute(data: UserSchema): Promise<CreatedUser | Error>
}

export { ICreateUser }
