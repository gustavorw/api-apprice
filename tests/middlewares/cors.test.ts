import { describe, test } from 'vitest'
import { app } from '../../src/config/app'
import request from 'supertest'

describe('cors', () => {
    test('test enable cors', async () => {
        app.post('/test_cors', (req, res) => {
            res.send()
        })

        await request(app)
            .get('/test_cors')
            .expect('access-control-allow-origin', '*')
            .expect('access-control-allow-methods', '*')
            .expect('access-control-allow-headers', '*')
    })
})
