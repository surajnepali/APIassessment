import { createNoteApi } from "../../api/note/create.api";
import { registerUserApi } from "../../api/user/register.api";
import { createNoteData } from "../../data/note/note.data";
import { registerUserData } from "../../data/user/register.data";
import { errorMessages } from "../../message/note/note.message";

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
            registerUserApi(registerUserData).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.haveOwnProperty('token');
                userToken = response.body.token;
            });
        });

        it("Can't create order without filling any fields", () => {
            createNoteApi({}, userToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.haveOwnProperty('message', 'Bad Request');
            });
        });

    });

});