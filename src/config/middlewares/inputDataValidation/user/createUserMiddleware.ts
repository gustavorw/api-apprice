import { badRequest, ok } from '../../../../helpers/http/responses'
import { httpRequest, httpResponse } from '../../../../types/http'
import { IMiddleware } from '../IMiddleware'
import { z } from 'zod'

class CreateUserMiddleware implements IMiddleware {
    async handle(httpRequest: httpRequest): Promise<httpResponse> {
        const userSchema = z.object({
            name: z
                .string({
                    invalid_type_error: 'Name must be a string!',
                    required_error: 'Name is required!',
                })
                .nonempty("Name can't be empty!"),
            email: z
                .string({
                    invalid_type_error: 'Email must be a string!',
                    required_error: 'Email is required!',
                })
                .email({ message: 'Invalid email address!' }),
            password: z
                .string({
                    invalid_type_error: 'Password must be a string!',
                    required_error: 'Password is required!',
                })
                .min(8, {
                    message: 'Password must be 8 or more characters long!',
                }),
            price_hour: z
                .number({ invalid_type_error: 'Price hour must be a number!' })
                .nonnegative({
                    message: 'Price Hour must be a positive number!',
                })
                .optional(),
        })

        const result = userSchema.safeParse(httpRequest.body)
        if (result.success) {
            return ok({ success: true })
        } else {
            return badRequest(result.error.errors[0]['message'])
        }
    }
}

export { CreateUserMiddleware }
