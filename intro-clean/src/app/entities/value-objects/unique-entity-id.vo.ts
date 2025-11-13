import { randomUUID } from "node:crypto";
import { InvalidUniqueEntityIdFormat } from "../../errors/domain/invalid-Unique-entity-id-format.js";

export class UniqueEntityID {
    public readonly value: string;

    private constructor(value?: string) {
        this.value = value ?? randomUUID();
        
        Object.freeze(this);
    }

    public static create(id?: string): UniqueEntityID {
        if(id && !UniqueEntityID.validade(id)) throw new InvalidUniqueEntityIdFormat(id);

        return new UniqueEntityID(id);
    }

    private static validade(id: string) {
        const uuidRgex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    
        return uuidRgex.test(id)
    }
}