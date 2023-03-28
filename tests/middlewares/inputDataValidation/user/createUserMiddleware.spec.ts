import { describe, expect, test } from 'vitest'
import { IMiddleware } from '../../../../src/config/middlewares/inputDataValidation/IMiddleware'
import { CreateUserMiddleware } from '../../../../src/config/middlewares/inputDataValidation/user/createUserMiddleware'
import { ok, badRequest } from '../../../../src/helpers/http/responses'

const makeSut = (): IMiddleware => {
    return new CreateUserMiddleware()
}

describe('create user middleware', () => {
    test('test return true of parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                name: 'victor',
                email: 'victor@email.to',
                password: 'teste123',
                price_hour: 10,
            },
        }
        const result = await sut.handle(data)
        expect(result).toEqual(ok({ success: true }))
    })

    test('test return error message of name parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                name: '',
                email: 'victor@email.to',
                password: 'teste123',
                price_hour: 10,
            },
        }
        const result = await sut.handle(data)
        expect(result).toEqual(badRequest("Name can't be empty!"))
    })

    test('test return error message of email parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                name: 'victor',
                email: 'victor',
                password: 'teste123',
                // price_hour: 10,
            },
        }
        const result = await sut.handle(data)
        expect(result).toEqual(badRequest('Invalid email address!'))
    })

    test('test return error message of password parse data schema', async () => {
        const sut = makeSut()
        const data = {
            body: {
                name: 'victor',
                email: 'victor@email.to',
                password: 'teste',
                price_hour: 10,
            },
        }
        const result = await sut.handle(data)
        expect(result).toEqual(
            badRequest('Password must be 8 or more characters long!')
        )
    })
})
