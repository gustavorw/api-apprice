import { IEncrypt } from './interfaces/IEncrypt'
import jwt from 'jsonwebtoken'

class JwtAdapter implements IEncrypt {
    constructor(private readonly secret: string) {}

    async encrypt(value: number): Promise<string> {
        const token = jwt.sign({ id: value }, this.secret, { expiresIn: '1d' })
        return token
    }
}

export { JwtAdapter }
