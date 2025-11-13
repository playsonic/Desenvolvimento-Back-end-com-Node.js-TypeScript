import { compare, hash } from "bcrypt";
import { invalidPassordError } from "../../errors/domain/invalid-password.erro.js";

export class Password {
    public readonly value: string;
    private static readonly salt_rounds = 10

    private constructor(value: string) {
        this.value = value;

        Object.freeze(this);
    }

    public static createFromHash(hashedValue: string): Password{
        return new Password(hashedValue)
    }
    public static async create(plainTextPassword: string): Promise<Password> {
        if(!Password.validate(plainTextPassword)) throw new invalidPassordError();
         

        const hashedValue = await hash(plainTextPassword, Password.salt_rounds);

        return new Password(hashedValue);        
    }

    private static validate(password: string): boolean {
        const isBiggerEnough = password.length >= 7;

        const haslatter = /[a-zA-Z]/.test(password);

        const hasnumber = /[0-9]/.test(password);

        const hasspecialcharacters = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password);

        return isBiggerEnough && haslatter && hasnumber && hasspecialcharacters;
    }

    public compare(plainTextPassword: string): Promise<boolean> {
        return compare(plainTextPassword, this.value);
    }
}