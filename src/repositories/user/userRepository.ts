import { PrismaClient } from '@prisma/client'
import { UserSchema, CreatedUser } from '../../models/user'
import { IUserRepository } from './IUserRepository'

class UserRepository implements IUserRepository {
    constructor(private readonly client: PrismaClient) {}

    async create(data: UserSchema): Promise<CreatedUser> {
        const user = await this.client.user.create({ data })
        return user
    }
}

export { UserRepository }
