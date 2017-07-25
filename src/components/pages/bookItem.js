"use strict"

import React, { Component } from 'react';
import { Well, Col, Row, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart} from '../../actions/cartActions';

class BookItem extends Component {
    handleCart(){
        const book=[...this.props.cart,this.props.book];
        this.props.addToCart(book);
    }
    render() {
        return (
            <Well>
                <Row>
                    <Col xs={12}>
                        <h6>{this.props.book.title}</h6>
                        <p>{this.props.book.description}</p>
                        <h6>{this.props.book.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle="primary">Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return {
        cart:state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCart},dispatch)
}

export default connect (mapStateToProps,mapDispatchToProps) (BookItem);