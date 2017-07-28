"use strict"
import React, { Component } from 'react';
import {
    Well, Panel, FormControl, FormGroup, ControlLabel,
    Button, InputGroup, DropdownButton, Image, Col, Row, MenuItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';

import { postBooks, deleteBook, getBooks } from '../../actions/booksActions'
import axios from 'axios';

class BooksForm extends Component {
    constructor(){
        super();
        this.state={
            images:[{}],
            img:''
        }

    }
    componentDidMount(){
        this.props.getBooks();
        //GET IMAGES FROM SERVER
        axios.get('/api/images').then((response)=>{
          this.setState({images:response.data})
        }).catch ((err)=>{
            this.setState({images:'Oops Something gone wrong'})
        })
    }
    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value,
            images:findDOMNode(this.refs.image).value
        }]
        console.log("Before Post")
        this.props.postBooks(book);
    }
    handleDelete() {
        const _id = findDOMNode(this.refs.delete).value;
        this.props.deleteBook(_id);
    }
    handleSelect(name){
        this.setState({
            img:'/images/'+name
        })
    }
    render() {
        const bookList = this.props.books.map((book) => {
            return (
                <option key={book._id}>{book._id}</option>
            )
        })

        const imgList=this.state.images.map((image,i)=>{
            return (
                <MenuItem key={i} eventKey={image.name}
                onClick={this.handleSelect.bind(this,image.name)}>
                {image.name}
                </MenuItem>
            )
        },this)
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary"
                                >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
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
                    </Col>
                </Row>

            </Well>
        )
    }
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ postBooks, deleteBook,getBooks }, dispatch)

}
function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);