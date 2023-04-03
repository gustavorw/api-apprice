import { afterAll, describe, test } from 'vitest'
import resquest from 'supertest'
import { app } from '../../../src/config/app'
import { clientdB } from '../../../src/database/client'

const client = clientdB

describe('test private router', () => {
    afterAll(async () => {
        await client.user.deleteMany({})
    })

    test('test error unauthorized', async () => {
        await resquest(app).get('/api/v1/user/profile').expect(401)
    })
})
