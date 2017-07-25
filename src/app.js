"use strict"
//REACT
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
//IMPORT COMBINED REDUCERS
import reducer from './reducers/index';
//IMPORT ACTIONS
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

import BookList from './components/pages/booksList';

render(
    <Provider store={store}>
        <BookList />
    </Provider>
    , document.getElementById('app')
);

//store.dispatch(postBooks());

/*
//Delete a book
store.dispatch(deleteBook({id:1}));

//Update a book
store.dispatch(updateBook({
        id: 2,
        title: "Learn MERN Stack"
    }))

// Cart Actions 
store.dispatch(addToCart([{id:2}]))
*/
