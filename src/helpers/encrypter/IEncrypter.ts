interface IEncrypter {
    hash(password: string): Promise<String>
}

export { IEncrypter }
