import { CreatedUser, CreateUserRepoDTO } from '../../../types/user'

interface IAddUserRepository {
    add(data: CreateUserRepoDTO): Promise<CreatedUser>
}

export { IAddUserRepository }
