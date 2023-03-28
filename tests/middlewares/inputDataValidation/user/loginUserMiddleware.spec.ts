import { describe, expect, test } from 'vitest'
import { IMiddleware } from '../../../../src/config/middlewares/inputDataValidation/IMiddleware'
import { LoginMiddleware } from '../../../../src/config/middlewares/inputDataValidation/user/loginUserMiddleware'
import { ok, badRequest } from '../../../../src/helpers/http/responses'

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

        const result = await sut.handle(data)
        expect(result).toEqual(ok({ success: true }))
    })

    test('test return error message of email parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                email: '',
                password: 'any_password',
            },
        }

        const result = await sut.handle(data)
        expect(result).toEqual(badRequest('Invalid email address!'))
    })

    test('test return error message of pasword parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                email: 'any_email@mail.com',
                password: '',
            },
        }

        const result = await sut.handle(data)
        expect(result).toEqual(
            badRequest('Password must be 8 or more characters long!')
        )
    })
})
