import { createNoteApi } from "../../api/note/create.api";
import { loginUserApi } from "../../api/user/login.api";
import { createNoteData } from "../../data/note/note.data";
import { errorMessages, successMessages } from "../../message/note/note.message";

describe("Create Note API Testing", () => {

    describe("Without logging in", () => {

        it("Should not be able to create note", () => {
            createNoteApi(createNoteData).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.notAuthenticated}`); 
            });
        });

    });

    describe("After logging in", () => {
        
        let userToken;

        before(() => {
            loginUserApi(Cypress.env('email'), Cypress.env('password')).then((response) => {
                expect(response.status).to.eq(200);
                userToken = response.body.data.token;
            });
        });

        it("Can't create note leaving title field empty", () => {
            let emptyTitle = { ...createNoteData, title: ''};
            createNoteApi(emptyTitle, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.emptyTitle}`);
            });
        });

        it("Can't create note leaving description field empty", () => {
            let emptyDescription = { ...createNoteData, description: ''};
            createNoteApi(emptyDescription, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.emptyDescription}`);
            });
        });

        it("Can't create note leaving category field empty", () => {
            let emptyCategory = { ...createNoteData, category: ''};
            createNoteApi(emptyCategory, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.emptyCategory}`);
            });
        });

        it("Can create note", () => {
            createNoteApi(createNoteData, userToken).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.haveOwnProperty('message', `${successMessages.noteCreated}`);
                expect(response.body.data.title).to.eq(createNoteData.title);
                expect(response.body.data.description).to.eq(createNoteData.description);
                expect(response.body.data.category).to.eq(createNoteData.category);
            });
        });

    });

});