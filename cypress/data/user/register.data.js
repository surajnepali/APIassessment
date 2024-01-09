import { faker } from "@faker-js/faker";

export const registerUserData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}