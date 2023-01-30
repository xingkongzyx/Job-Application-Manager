import { CustomAPIError } from "./custom-api.js";

class NotAuthenticationError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

export { NotAuthenticationError };
