export class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(400, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    static unAuthorized(message) {
        return new ApiError(401, message)
    }
}