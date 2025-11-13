import { AppError } from "../app-error.js";

export class EmailAlreadyExist extends AppError {
    constructor(email: string) {
        const message = `is ${email} already been used!`

        super(message, 409)
    }
}