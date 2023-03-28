interface IDecrypt {
    decrypt(token: string): Promise<number | string>
}

export { IDecrypt }
