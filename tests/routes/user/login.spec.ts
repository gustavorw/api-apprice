import { afterAll, describe, test } from 'vitest'
import resquest from 'supertest'
import { app } from '../../../src/config/app'
import { clientdB } from '../../../src/database/client'

const client = clientdB

describe('test login route', () => {
    afterAll(async () => {
        await client.user.deleteMany({})
    })

    test('test error unauthorized', async () => {
        await resquest(app)
            .post('/api/v1/user/login')
            .send({
                email: 'any_email@email.com',
                password: 'any_password',
            })
            .expect(401)
    })

    test('test login success', async () => {
        await resquest(app)
            .post('/api/v1/user/signup')
            .send({
                name: 'name',
                email: 'email@email.com',
                password: 'password',
                price_hour: 10.5,
            })
            .expect(201)

        await resquest(app)
            .post('/api/v1/user/login')
            .send({
                email: 'email@email.com',
                password: 'password',
            })
            .expect(200)
    })

    test('test middleware return badRequest', async () => {
        await resquest(app)
            .post('/api/v1/user/login')
            .send({
                email: '',
                password: 'any_password',
            })
            .expect(400)
    })
})
