import { IEncrypter } from './IEncrypter'
import bcrypt from 'bcryptjs'

class Encrypter implements IEncrypter {
    constructor(private readonly salt: number) {}

    async hash(password: string): Promise<String> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash
    }
}

export { Encrypter }
