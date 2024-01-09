import { noteEndpoints } from "../../constant/endpoints";

export const createNoteApi = (data, token) => cy.api({
    method: 'POST',
    url: Cypress.env('apiURL') + noteEndpoints.notes,
    headers: {
        'Authorization': `Bearer ${token}`
    },
    body: data,
    failOnStatusCode: false
})