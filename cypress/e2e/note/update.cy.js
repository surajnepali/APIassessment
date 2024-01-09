import { createNoteApi } from "../../api/note/create.api";
import { updateNoteApi } from "../../api/note/update.api";
import { loginUserApi } from "../../api/user/login.api";
import { createNoteData, updateNoteData } from "../../data/note/note.data";
import { errorMessages, successMessages } from "../../message/note/note.message";

let noteId, userToken

describe("Update Note API Testing", () => {
   
    describe("After logging in", () => {

        before(() => {
            loginUserApi(Cypress.env('email'), Cypress.env('password')).then((response) => {
                expect(response.status).to.eq(200);
                userToken = response.body.data.token;
            });
        });

        it("Create note", () => {
            createNoteApi(createNoteData, userToken).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.haveOwnProperty('message', `${successMessages.noteCreated}`);
                noteId = response.body.data.id;
            });
        });

        it("Can't update note emptying title", () => {
            let emptyTitle = { ...updateNoteData, title: ''};
            updateNoteApi(noteId, emptyTitle, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.emptyTitle}`);
            });
        });

        it("Can't update note emptying description", () => {
            let emptyDescription = { ...updateNoteData, description: ''};
            updateNoteApi(noteId, emptyDescription, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.emptyDescription}`);
            });
        });

        it("Can't update note emptying category", () => {
            let emptyCategory = { ...updateNoteData, category: ''};
            updateNoteApi(noteId, emptyCategory, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.emptyCategory}`);
            });
        });

        it("Can't update note leaving completed boolean empty", () => {
           let emptyBoolean = { ...updateNoteData, completed: ''};
           updateNoteApi(noteId, emptyBoolean, userToken).then((response) => {
               expect(response.status).to.eq(400);
               expect(response.body).to.haveOwnProperty('message', `${errorMessages.emptyCompleted}`);
           });
        });

        it("Can't update note with invalid id", () => {
            updateNoteApi("123456", updateNoteData, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.noteNotFound}`);
            });
        });

        it("Can update note", () => {
            updateNoteApi(noteId, updateNoteData, userToken).then((response) => {
                expect(response.status).to.eq(200);
                // expect(response.body).to.haveOwnProperty('message', `${successMessages.noteUpdated}`);
                expect(response.body.data.title).to.eq(updateNoteData.title);
                expect(response.body.data.description).to.eq(updateNoteData.description);
                expect(response.body.data.category).to.eq(updateNoteData.category);
            });
        });

    });
    
    describe("Without logging in", () => {
        
        it("Should not be able to update note", () => {
            updateNoteApi(noteId, updateNoteData, "").then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.haveOwnProperty('message', `${errorMessages.noToken}`); 
            });
        });

    })

});