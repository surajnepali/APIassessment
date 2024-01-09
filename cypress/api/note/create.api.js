import { noteEndpoints } from "../../constant/endpoints";

export const createNoteApi = (data, token) => cy.api({
    method: 'POST',
    url: Cypress.env('apiURL') + noteEndpoints.notes,
    headers: {
        'X-Auth-Token': `${token}`
    },
    body: data,
    failOnStatusCode: false
})