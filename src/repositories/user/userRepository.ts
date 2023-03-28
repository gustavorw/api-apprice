import { PrismaClient } from '@prisma/client'
import { CreatedUser, CreateUserRepoDTO } from '../../types/user'
import { IAddUserRepository } from './intefaces/IAddUserRepository'
import { IGetUserEmailRepository } from './intefaces/IGetUserEmailRepository'
import { IGetUserIdRepository } from './intefaces/IGetUserIdRepository'

class UserRepository
    implements
        IAddUserRepository,
        IGetUserEmailRepository,
        IGetUserIdRepository
{
    constructor(private readonly client: PrismaClient) {}

    async getUserById(userId: number): Promise<CreatedUser | null> {
        const user = await this.client.user.findUnique({
            where: { id: userId },
        })
        return user
    }

    async getUserByEmail(email: string): Promise<CreatedUser | null> {
        const user = await this.client.user.findFirst({
            where: { email: email },
        })
        return user
    }

    async add(data: CreateUserRepoDTO): Promise<CreatedUser> {
        const user = await this.client.user.create({ data })
        return user
    }
}

export { UserRepository }
