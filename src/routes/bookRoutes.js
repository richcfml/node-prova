var express = require('express');
var bookRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevish Tolstoy',
        read: false
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevish Tolstoy',
        read: false
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevish Tolstoy',
        read: false
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevish Tolstoy',
        read: false
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevish Tolstoy',
        read: false
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevish Tolstoy',
        read: false
    }
    
];
bookRouter.route('/')
    .get(function(req, res){
        res.render('books', {
        title: 'Books', 
        nav: [
            { 
                Link:'/Books', 
                Text: 'Books'
            }, 
            {
                Link:'/Authors', 
                Text:'Authors'
            }
        ],
        books: books
        });
    });

bookRouter.route('/single')
    .get(function(req, res){
        res.send('Hello single Book');
    });

module.exports = bookRouter;