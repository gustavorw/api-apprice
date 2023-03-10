import { CreatedUser, CreateUserRepoDTO } from '../../types/user'

interface IUserRepository {
    create(data: CreateUserRepoDTO): Promise<CreatedUser>
    getUserByEmail(email: string): Promise<CreatedUser | null>
}

export { IUserRepository }
