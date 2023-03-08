import { describe, test } from 'vitest'
import request from 'supertest'
import { app } from '../../config/app'

describe('body parser', () => {
    test('test bodyParser json', async () => {
        app.post('/test_body_parser', (req, res) => {
            res.send(req.body)
        })

        await request(app)
            .post('/test_body_parser')
            .send({ name: 'test' })
            .expect({ name: 'test' })
    })
})
