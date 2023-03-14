interface IUseCase<T, U, V> {
    execute(data: T): Promise<U | V>
}

export { IUseCase }
