"use strict"

export function bookReducers(state = { books: [] }, action) {
    switch (action.type) {
        case "POST_BOOK":
            // const books = state.books.concat(action.payload);
            // return {books};
            //Instead we can use spread operator
            return { books: [...state.books, ...action.payload] }
        case "DELETE_BOOK":
            //Create a copy of current book array
            const currentBookToDelete = [...state.books];
            //Determine at which index in the book array needs to be deleted
            const indexToDelete = currentBookToDelete.findIndex(
                (book) => {
                    return book.id == action.payload.id;
                }
            )
            //Use slice to remove the book
            return {
                books: [...currentBookToDelete.slice(0, indexToDelete),
                ...currentBookToDelete.slice(indexToDelete + 1)]
            };

        case "UPDATE_BOOK":
            const currentBookToUpdate = [...state.books];
            const indexToUpdate = currentBookToUpdate.findIndex(
                (book) => {
                    return book.id == action.payload.id;
                }
            )

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            }

            console.log("New book to update", newBookToUpdate);

            return {
                books:
                [...currentBookToUpdate.slice(0, indexToUpdate),
                    newBookToUpdate,
                ...currentBookToUpdate.slice(indexToUpdate +
                    1)]
            }

    }
    return state;
}