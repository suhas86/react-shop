"use strict"
//REACT
import React from 'react';

import {render} from 'react-dom';
import { Provider } from 'react-redux';
//ROUTER
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
import Menu from './components/menu';
import Footer from './components/footer';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
const Routes = (
  <Provider store={store}>
      <BrowserRouter>
        <div>
        <Menu/>
        <Switch>
            <Route path="/admin" component={BooksForm}/>
            <Route path="/cart" component={Cart}/>
            <Route exact path="/" component={BookList}/>
        </Switch>
        <Footer />
        </div>
      </BrowserRouter>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);

