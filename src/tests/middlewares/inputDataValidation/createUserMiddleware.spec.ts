import { describe, expect, test } from 'vitest'
import { IMiddleware } from '../../../config/middlewares/inputDataValidation/IMiddleware'
import { CreateUserMiddleware } from '../../../config/middlewares/inputDataValidation/createUserMiddleware'

const makeSut = (): IMiddleware => {
    return new CreateUserMiddleware()
}

describe('create user middleware', () => {
    test('test return true of parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                username: 'victor',
                email: 'victor@email.to',
                password: 'teste123',
                price_hour: 10,
            },
        }
        const result = await sut.verifyData(data)
        expect(result).toBeTruthy()
    })
})
