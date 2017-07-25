"use strict"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BookList extends Component {
    componentDidMount() {
        this.props.getBooks();
    }
    render() {

        const booksList = this.props.books.map((book) => {
            return (
                <Col xs={12} md={4} sm={6} key={book._id}>
                    <BookItem book={book} />
                </Col>
            )
        });

        return (
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row style={{ marginTop: '15px' }}>
                    <Col xs={12} sm={6}>
                        <BooksForm />
                    </Col>
                    {booksList}
                </Row>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getBooks: getBooks }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);