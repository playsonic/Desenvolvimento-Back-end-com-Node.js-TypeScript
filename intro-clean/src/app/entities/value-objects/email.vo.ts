import { InvalidEmailFormat } from "../../errors/domain/invalid-email-format.error.js";

export class Email {
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;

        Object.freeze(this)
    }

    public static create(email: string): Email {

        if (!Email.validate(email)) throw new InvalidEmailFormat(email)
            return new Email(email)
    }

    private static validate(email: string): boolean {
        if(!email) return false;
        
        const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/

        return emailRegex.test(email);
    }
}