import { userEndpoints } from "../../constant/endpoints";

export const loginUserApi = (email, password) => cy.api({
    method: 'POST',
    url: Cypress.env('apiURL') + userEndpoints.login,
    body: {
        email,
        password
    },
    failOnStatusCode: false
})