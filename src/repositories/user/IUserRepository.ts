import { CreatedUser, UserSchema } from '../../models/user'

interface IUserRepository {
    create(data: UserSchema): Promise<CreatedUser>
}

export { IUserRepository }
