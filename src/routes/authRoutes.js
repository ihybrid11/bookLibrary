const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const authRouter = express.Router();
const debug = require('debug')('app:authRoutes');


function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            debug(req.body);
            const { username, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);
                    const col = await db.collection('users');
                    const user = { username, password };

                    const results = await col.insertOne(user);
                    //debug(results);

                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });

                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });

    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'Sign In'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    authRouter.route('/profile')
        .all((req, res, next) => {
            if(req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;