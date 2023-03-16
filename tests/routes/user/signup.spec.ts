import { afterAll, describe, test } from 'vitest'
import resquest from 'supertest'
import { app } from '../../../src/config/app'
import { clientdB } from '../../../src/database/client'

const client = clientdB

describe('test signup route', () => {
    afterAll(async () => {
        await client.user.deleteMany({})
    })

    test('test return account success', async () => {
        await resquest(app)
            .post('/api/v1/user/signup')
            .send({
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                price_hour: 10.5,
            })
            .expect(201)
    })

    test('test error 400 ', async () => {
        await resquest(app)
            .post('/api/v1/user/signup')
            .send({
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                price_hour: 10.5,
            })
            .expect(400)
    })

    test('test middleware return bad request', async () => {
        await resquest(app)
            .post('/api/v1/user/signup')
            .send({
                name: '',
                email: 'any_email@email.com',
                password: 'any_password',
                price_hour: 10.5,
            })
            .expect(400)
    })
})
