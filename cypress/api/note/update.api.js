export const updateNoteApi = (id, data, token) => cy.api({
    method: 'PUT',
    url: Cypress.env('apiURL') + `/notes/${id}`,
    headers: {
        'X-Auth-Token': `${token}`
    },
    body: data,
    failOnStatusCode: false
})