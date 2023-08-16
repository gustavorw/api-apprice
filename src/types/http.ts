type httpRequest = {
    body?: any
    headers?: any
    userId?: number
}

type httpResponse = {
    statusCode: number
    body: any
}

export { httpRequest, httpResponse }
