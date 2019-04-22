const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }
];

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require('./src/routes/bookRoutes') (nav);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/books', bookRouter);

app.get('/', function (req, res) {
    // res.send('Hello World!');
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.render(
        'index',
        {
            nav,
            title: 'Library'
        }
    );
});

app.listen(port, '192.168.29.172', function () {
    debug(`listening on port ${chalk.green(port)}`);
});

// app.listen(serverPort, function () {
//     debug(`listening on port ${chalk.green(port)}`);
// });