"use strict"

export function cartReducers(state = { cart: [] }, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return { ...state,
                cart: action.payload,
            totalAmount:totals(action.payload).amount,
         totalQuantity:totals(action.payload).quantity}
            break;
        case "UPDATE_CART":
            const currentBookToUpdate = [...state.cart];
            const indexToUpdate = currentBookToUpdate.findIndex(
                (book) => {
                    return book._id == action._id;
                }
            )

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
            }
            let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate),
                newBookToUpdate,
            ...currentBookToUpdate.slice(indexToUpdate +
                1)
            ]
            return {
                ...state,
                cart: cartUpdate,
                totalAmount:totals(cartUpdate).amount,
                totalQuantity:totals(cartUpdate).quantity
            }

        case "DELETE_FROM_CART":
            return { ...state,
                cart:action.payload,
            totalAmount:totals(action.payload).amount,
        totalQuantity:totals(action.payload).quantity}
    }

    return state;
}


//Calculate Totals
export function totals(payloadArr){
    const totalAmount=payloadArr.map((cartArr)=>{
        return cartArr.price*cartArr.quantity;
    }).reduce(function(a,b){
        return a+b;
    },0); //Start summing from index 0

    const totalQuantity=payloadArr.map((qty)=>{
        return qty.quantity;
    }).reduce(function(a,b){
        return a+b;
    },0);

    return {amount:totalAmount.toFixed(2),
            quantity:totalQuantity};
}