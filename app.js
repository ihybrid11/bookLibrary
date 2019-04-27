const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }
];

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require('./src/routes/bookRoutes') (nav);
const adminRouter = require('./src/routes/adminRoutes') (nav);
const authRouter = require('./src/routes/authRoutes') (nav);


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library'}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

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