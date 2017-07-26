"use strict"

//Add to cart
export function addToCart(book) {
    return {
        type: "ADD_TO_CART",
        payload: book
    }
}

//Update cart
export function updateCart(_id, unit) {
    return {
        type: "UPDATE_CART",
        _id: _id,
        unit: unit
    }
}

//Delete item from cart
export function deleteFromCart(cart) {
    return {
        type: "DELETE_FROM_CART",
        payload: cart
    }
}