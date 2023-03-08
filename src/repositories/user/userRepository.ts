import { PrismaClient } from '@prisma/client'
import { CreatedUser, CreateUserRepoDTO } from '../../types/user'
import { IUserRepository } from './IUserRepository'

class UserRepository implements IUserRepository {
    constructor(private readonly client: PrismaClient) {}

    async getUserByEmail(email: string): Promise<CreatedUser | null> {
        const user = await this.client.user.findFirst({
            where: { email: email },
        })
        return user
    }

    async create(data: CreateUserRepoDTO): Promise<CreatedUser> {
        const user = await this.client.user.create({ data })
        return user
    }
}

export { UserRepository }
