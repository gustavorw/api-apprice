class UserExists extends Error {
    constructor() {
        const message =
            'Account with this email already exists! Try with another email!'
        super(message)
        this.message = message
    }
}

export { UserExists }
