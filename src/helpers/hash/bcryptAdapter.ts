import { IHashCompare } from './interfaces/ICompare'
import { IHash } from './interfaces/IHash'
import bcrypt from 'bcryptjs'

class Hasher implements IHash, IHashCompare {
    constructor(private readonly salt: number) {}

    async hash(password: string): Promise<String> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash
    }

    async compare(value: string, hash: string): Promise<boolean> {
        await bcrypt.compare(value, hash)
    }
}

export { Hasher }
