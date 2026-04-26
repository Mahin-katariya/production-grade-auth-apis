class APIError extends Error {
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true //to be studied later. (flag)
        Error.captureStackTrace(this,this.constructor)
    }

    static badRequest(message = "Bad request"){
        return new APIError(400, message)
    }

    static unauthorized(message = "Unauthorized"){
        return new APIError(401, message)
    }

    static conflict(message = "Conflict") {
        return new APIError(409, message)
    }

    static forbidden(message = "Forbidden"){
        return new APIError(412, message)
    }

    static notfound(message = "Not found!") {
        return new APIError(404,message)
    }

}

export default APIError