export const errorMessages = {
    notAuthenticated: 'Access token is not valid or has expired, you will need to login',
    noToken: 'No authentication token specified in x-auth-token header',
    emptyTitle: "Title must be between 4 and 100 characters",
    emptyDescription: "Description must be between 4 and 1000 characters",
    emptyCategory: "Category must be one of the categories: Home, Work, Personal",
    emptyCompleted: "Note completed status must be boolean",
    noteNotFound: "Note ID must be a valid ID"
}

export const successMessages = {
    noteCreated: 'Note successfully created'
}