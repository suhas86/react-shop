"use strict"
import React, { Component } from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';

import { postBooks, deleteBook } from '../../actions/booksActions'

class BooksForm extends Component {
    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        console.log("Before Post")
        this.props.postBooks(book);
    }
    handleDelete() {
        const _id = findDOMNode(this.refs.delete).value;
        this.props.deleteBook(_id);
    }
    render() {
        const bookList = this.props.books.map((book) => {
            return (
                <option key={book._id}>{book._id}</option>
            )
        })
        return (
            <Well>
                <Panel>
                    <FormGroup controlId="title">
                        <ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter title"
                                ref="title" />
                        </ControlLabel>
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Description"
                                ref="description" />
                        </ControlLabel>
                    </FormGroup>
                    <FormGroup controlId="price">
                        <ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Price"
                                ref="price" />
                        </ControlLabel>
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save Book</Button>
                </Panel>
                <Panel style={{ marginTop: '25px' }}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select a book to delete</ControlLabel>
                        <FormControl ref="delete" componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            {bookList}
                        </FormControl>
                    </FormGroup>
                    <Button
                        onClick={this.handleDelete.bind(this)}
                        bsStyle="danger">Delete Book</Button>
                </Panel>
            </Well>
        )
    }
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ postBooks, deleteBook }, dispatch)

}
function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);