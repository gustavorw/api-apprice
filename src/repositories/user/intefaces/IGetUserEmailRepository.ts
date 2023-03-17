import { CreatedUser } from '../../../types/user'

interface IGetUserEmailRepository {
    getUserByEmail(email: string): Promise<CreatedUser | null>
}

export { IGetUserEmailRepository }
