import { AppError } from "../app-error.js";

export class invalidPassordError extends AppError {
    constructor() {
        const message = `Password must be at least 8 characters long and contain at lest one letter, one number and one special character`;

        super(message, 400)
    }
}