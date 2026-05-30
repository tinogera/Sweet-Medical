export class AppError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

export class BadRequestError extends AppError {}
export class NotFoundError extends AppError {}
export class ConflictError extends AppError {}
export class UnprocessableEntityError extends AppError {}