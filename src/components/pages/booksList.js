"use strict"

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';

class BookList extends Component{
    componentDidMount(){
        this.props.getBooks();
    }
    render(){

        const booksList=this.props.books.map((book)=>{
            return (
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <h2>{book.description}</h2>
                    <h2>{book.price}</h2>
                </div>
            )
        });

        return (
            <div>
                <h1>Book List</h1>
                {booksList}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        books:state.books.books
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({getBooks:getBooks},dispatch)
}
export default connect (mapStateToProps,mapDispatchToProps) (BookList);