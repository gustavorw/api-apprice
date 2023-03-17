class AuthenticationError extends Error {
    constructor(message: string) {
        super(message)
        this.message = message
    }
}

export { AuthenticationError }