type UserSchema = {
    name: string
    email: string
    password: string
    price_hour: number
    createdAt?: Date | null
    updatedAt?: Date | null
}

type CreatedUser = {
    id: number
    name: string
    email: string
    password: string
    price_hour: number
    creatadAt?: Date | null
    updatedAt?: Date | null
}

export { UserSchema, CreatedUser }
