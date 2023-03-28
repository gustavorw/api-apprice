import { describe, expect, test } from 'vitest'
import { IMiddleware } from '../../../../src/config/middlewares/inputDataValidation/IMiddleware'
import { LoginMiddleware } from '../../../../src/config/middlewares/inputDataValidation/user/loginUserMiddleware'

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

    test('test return error message of email parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                email: '',
                password: 'any_password',
            },
        }

        const result = await sut.verifyData(data)
        expect(result).toBe('Invalid email address!')
    })

    test('test return error message of pasword parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                email: 'any_email@mail.com',
                password: '',
            },
        }

        const result = await sut.verifyData(data)
        expect(result).toBe('Password must be 8 or more characters long!')
    })
})
