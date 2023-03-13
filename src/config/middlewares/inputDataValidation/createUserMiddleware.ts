import { httpRequest } from '../../../types/http'
import { IMiddleware } from './IMiddleware'
import { z } from 'zod'

class CreateUserMiddleware implements IMiddleware {
    async verifyData(httpRequest: httpRequest): Promise<boolean | string> {
        const userSchema = z.object({
            name: z
                .string({
                    invalid_type_error: 'Username must be a string!',
                    required_error: 'Username is required!',
                })
                .nonempty("Username can't be empty!"),
            email: z
                .string({
                    invalid_type_error: 'Email must be a string!',
                    required_error: 'Email is required!',
                })
                .email({ message: 'Invalid email address!' }),
            password: z
                .string({ invalid_type_error: 'Password must be a string!' })
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
            return true
        } else {
            return result.error.errors[0]['message']
        }
    }
}

export { CreateUserMiddleware }
