import { PrismaClient } from '@prisma/client'
import { CreatedUser, CreateUserRepoDTO } from '../../types/user'
import { IAddUserRepository } from './intefaces/IAddUserRepository'

class UserRepository implements IAddUserRepository {
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
