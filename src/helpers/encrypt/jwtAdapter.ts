import { IDecrypt } from './interfaces/IDecrypt'
import { IEncrypt } from './interfaces/IEncrypt'
import jwt from 'jsonwebtoken'

class JwtAdapter implements IEncrypt, IDecrypt {
    constructor(private readonly secret: string) {}

    async encrypt(value: number): Promise<string> {
        const token = jwt.sign({ id: value }, this.secret, { expiresIn: '1d' })
        return token
    }

    async decrypt(token: string): Promise<string | number> {
        jwt.verify(token, this.secret)
        return new Promise((resolve) => resolve(''))
    }
}

export { JwtAdapter }
