import { CreatedUser, CreateUserRepoDTO } from '../../../types/user'

interface IAddUserRepository {
    create(data: CreateUserRepoDTO): Promise<CreatedUser>
    getUserByEmail(email: string): Promise<CreatedUser | null>
}

export { IAddUserRepository }
