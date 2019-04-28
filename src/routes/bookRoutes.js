const express = require('express');
const bookController = require('../controllers/bookController');
const bookRouter = express.Router();


function router(nav) {
    const { getIndex, getById, middlewere } = bookController(nav);
    bookRouter.use(middlewere);

    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);

    return bookRouter;

}


module.exports = router;
