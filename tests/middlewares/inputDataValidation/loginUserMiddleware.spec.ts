import { describe, expect, test } from 'vitest'
import { IMiddleware } from '../../../src/config/middlewares/inputDataValidation/IMiddleware'
import { LoginMiddleware } from '../../../src/config/middlewares/inputDataValidation/loginUserMiddleware'

const makeSut = (): IMiddleware => {
    return new LoginMiddleware()
}

describe('test loginUserMiddleware', () => {
    test('test return true of parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        }

        const result = await sut.verifyData(data)
        expect(result).toBeTruthy()
    })
})
