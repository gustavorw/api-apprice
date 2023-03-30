type CreateUserUseCaseDTO = {
    name: string
    email: string
    password: string
    price_hour?: number | undefined
}

type CreateUserRepoDTO = {
    name: string
    email: string
    password: string
    price_hour?: number | undefined
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

type LoginUserDTO = {
    email: string
    password: string
}

type Header = {
    authorization?: string
}

export {
    CreatedUser,
    CreateUserRepoDTO,
    CreateUserUseCaseDTO,
    LoginUserDTO,
    Header,
}
