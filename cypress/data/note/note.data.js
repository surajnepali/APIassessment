import { faker } from "@faker-js/faker";

export const categories = ['Home', 'Work', 'Personal'];

export const createNoteData = {
    title: faker.lorem.text(),
    description: faker.lorem.paragraph(),
    category: categories[Math.floor(Math.random() * categories.length)],
}