import { userEndpoints } from "../../constant/endpoints";

export const registerUserApi = (data) => cy.api({
    method: 'POST',
    url: Cypress.env('apiURL') + userEndpoints.register,
    body: data,
    failOnStatusCode: false
});