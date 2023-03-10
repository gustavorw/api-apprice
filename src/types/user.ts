type CreateUserUseCaseDTO = {
    name: string
    email: string
    password: string
    price_hour: number
}

type CreateUserRepoDTO = {
    name: string
    email: string
    password: string
    price_hour: number
    createdAt: Date
    updatedAt: Date
}

type CreatedUser = {
    id: number
    name: string
    email: string
    password?: string
    price_hour: number
    createdAt?: Date | null
    updatedAt?: Date | null
}

export { CreatedUser, CreateUserRepoDTO, CreateUserUseCaseDTO }
