import { faker } from "@faker-js/faker";

export const categories = ['Home', 'Work', 'Personal'];

export const createNoteData = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    category: categories[Math.floor(Math.random() * categories.length)],
}

export const updateNoteData = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    category: categories[Math.floor(Math.random() * categories.length)],
    completed: faker.datatype.boolean()
}