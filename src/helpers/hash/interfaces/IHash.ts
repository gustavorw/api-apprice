interface IHash {
    hash(password: string): Promise<String>
}

export { IHash }
