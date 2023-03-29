interface IEncrypt {
    encrypt(value: number): Promise<string | number>
}

export { IEncrypt }
