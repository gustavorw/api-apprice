import { CreatedUser } from '../../../types/user'

interface IGetUserIdRepository {
    getUserById(userId: number): Promise<CreatedUser | null>
}

export { IGetUserIdRepository }
