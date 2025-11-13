import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Email } from '../../../../entities/value-objects/email.vo';
import { InvalidEmailFormat } from "../../../../errors/domain/invalid-email-format.error";

describe('Email VO', () => {
    it("should be able to crate an email when input is valid", () => {
        //Prepare
        const input = faker.internet.email();

        //Act
        const email =  Email.create(input);

        //Compare

        expect(email).toBeInstanceOf(Email);
        expect(email.value).toBe(input);
    });

    it("Should not create an email when is input is invalid", () => {
                //Prepare
        const input = 'useremail.com';

        //Act
        const act = () => {
            return Email.create(input);
        };

        //Compare

        expect(act).toThrow(InvalidEmailFormat);
        
    })
})