import { CreatedUser, UserSchema } from '../../types/user'

interface IUserRepository {
    create(data: UserSchema): Promise<CreatedUser>
    getUserByEmail(email: string): Promise<CreatedUser | null>
}

export { IUserRepository }
