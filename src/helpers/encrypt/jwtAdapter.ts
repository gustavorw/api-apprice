import { IDecrypt } from './interfaces/IDecrypt'
import { IEncrypt } from './interfaces/IEncrypt'
import jwt from 'jsonwebtoken'

type JwtPayload = {
    id: number
}

class JwtAdapter implements IEncrypt, IDecrypt {
    constructor(private readonly secret: string) {}

    async encrypt(value: number): Promise<string> {
        const token = jwt.sign({ id: value }, this.secret, { expiresIn: '8h' })
        return token
    }

    async decrypt(token: string): Promise<string | number> {
        try {
            const { id } = jwt.verify(token, this.secret) as JwtPayload
            return id
        } catch (error) {
            return 'Expired Token.'
        }
    }
}

export { JwtAdapter }
