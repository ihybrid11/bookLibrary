const express = require('express');
const bookController = require('../controllers/bookController');
const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');


function router(nav) {
    const { getIndex, getById, middlewere } = bookController(bookService ,nav);
    //bookRouter.use(middlewere);

    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);

    return bookRouter;

}


module.exports = router;
