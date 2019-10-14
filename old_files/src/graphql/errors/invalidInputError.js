export class InvalidInputError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 400;
    }
}