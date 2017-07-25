"use strict"
//Get Books
export function getBooks(){
    return {
        type:"GET_BOOKS"
    }
}
//Post a book
export function postBooks(book) {
    return {
        type: "POST_BOOK",
        payload: book
    }
}

//Delete a book
export function deleteBook(book) {
    return {
        type: "DELETE_BOOK",
        payload: book
    }
}
//Update a book
export function updateBook(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}