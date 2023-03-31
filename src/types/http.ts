type httpRequest = {
    body?: any
    headers?: any
}

type httpResponse = {
    statusCode: number
    body: any
}

export { httpRequest, httpResponse }
