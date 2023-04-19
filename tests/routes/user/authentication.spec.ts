import { afterAll, describe, test } from 'vitest'
import resquest from 'supertest'
import { app } from '../../../src/config/app'
import { clientdB } from '../../../src/database/client'
import jwt from 'jsonwebtoken'
import env from '../../../src/config/env'

const client = clientdB

const data = {
    name: 'teste',
    email: 'test@email.com',
    password: 'test1234',
    createdAt: new Date('2023-03-08T09:00'),
    updatedAt: new Date('2023-03-08T09:00'),
}

describe('test private router', () => {
    afterAll(async () => {
        await client.user.deleteMany({})
    })

    test('test return unauthorized', async () => {
        await resquest(app).get('/api/v1/user/profile').expect(401)
    })

    test('test return ok', async () => {
        const user = await client.user.create({ data })
        const token = jwt.sign({ id: user.id }, env.secret_key, {
            expiresIn: '8h',
        })

        await resquest(app)
            .get('/api/v1/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})
