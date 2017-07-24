"use strict"
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducer from './reducers/index';
import {addToCart} from './actions/cartActions';
import {postBooks,updateBook,deleteBook} from './actions/booksActions'
//Step 1 create the store
const middleware=applyMiddleware(logger);
const store = createStore(reducer,middleware);

//No need of this as we are using looger
/*store.subscribe(function () {
    console.log("Current state is ", store.getState())
})*/

//Step 2 create and dispatch actions
store.dispatch(postBooks([{
        id: 1,
        title: 'This is book title',
        description: 'This is book description',
        price: 33.3
    },
    {
        id: 2,
        title: 'This is second book title',
        description: 'This is second book description',
        price: 43.3
    }]));

//Delete a book
store.dispatch(deleteBook({id:1}));

//Update a book
store.dispatch(updateBook({
        id: 2,
        title: "Learn MERN Stack"
    }))

/** Cart Actions */
store.dispatch(addToCart([{id:2}]))
