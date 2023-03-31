interface IEncrypt {
    encrypt(value: number): Promise<string>
}

export { IEncrypt }
