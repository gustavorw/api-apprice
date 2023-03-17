import { IHash } from './interfaces/IHash'
import bcrypt from 'bcryptjs'

class Hasher implements IHash {
    constructor(private readonly salt: number) {}

    async hash(password: string): Promise<String> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash
    }
}

export { Hasher }
