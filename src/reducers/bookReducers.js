"use strict"

export function bookReducers(state = {
    books: [{
        _id: 1,
        title: 'This is book title',
        description: 'This is book description',
        price: 50.0
    },
    {
        _id: 2,
        title: 'This is second book title',
        description: 'This is second book description',
        price: 43.3
    }
    ]
},
    action) {
    switch (action.type) {
        case "GET_BOOKS":
            return {
                ...state,
                books: [...state.books]
            };

        case "POST_BOOK":
            // const books = state.books.concat(action.payload);
            // return {books};
            //Instead we can use spread operator
            return {
                books: [...state.books, ...action.payload]
            }
        case "DELETE_BOOK":
            //Create a copy of current book array
            const currentBookToDelete = [...state.books];
            //Determine at which index in the book array needs to be deleted
            const indexToDelete = currentBookToDelete.findIndex(
                (book) => {
                    return book._id == action.payload._id;
                }
            )
            //Use slice to remove the book
            return {
                books: [...currentBookToDelete.slice(0, indexToDelete),
                ...currentBookToDelete.slice(indexToDelete + 1)
                ]
            };

        case "UPDATE_BOOK":
            const currentBookToUpdate = [...state.books];
            const indexToUpdate = currentBookToUpdate.findIndex(
                (book) => {
                    return book._id == action.payload._id;
                }
            )

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            }

            console.log("New book to update", newBookToUpdate);

            return {
                books: [...currentBookToUpdate.slice(0, indexToUpdate),
                    newBookToUpdate,
                ...currentBookToUpdate.slice(indexToUpdate +
                    1)
                ]
            }

    }
    return state;
}