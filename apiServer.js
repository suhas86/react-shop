var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


//APIS
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var Books = require('./models/books.js');
//------>>>>>>>Post API <<<<<<-------//
app.post('/books', function (req, res) {
  var book = req.body;
  Books.create(book, function (err, books) {
    if (err) {
      throw err;
    } else {
      res.json(books);
    }
  })
});

//------->>>>Get Book List <<<<<<-----
app.get('/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) {
      throw err;
    } else {
      res.json(books);
    }
  })
})
//------->>>>Delete Book <<<<<<-----
app.delete('/books/:_id', function (req, res) {
  var query = {
    _id: req.params._id
  };
  Books.remove(query, function (err, books) {
    if (err) {
      throw err;
    } else {
      res.json(books);
    }
  })
});
//------->>>>Update Book <<<<<<-----
app.put('/books/:_id', function (req, res) {
  var book = req.body;
  var query = {
    _id: req.params._id
  };

//If field doesnt exists $set will add the field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      price: book.price,
      images : book.image
    }
  }

  //When true returns the updated document
  var options = {
    new: true
  };

  Books.findOneAndUpdate(query, update, options, function (err, books) {
    if (err) {
      throw err;
    } else {
      res.json(books);
    }
  })
});
//ENDAPIS

app.listen(3001,function(err){
  if(err){
    return console.log(err);
  }  
    console.log("Api server is listening at 3001")
  
})