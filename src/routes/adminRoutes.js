const express = require('express');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');

const books = [
    {
        author: "Chinua Achebe",
        country: "Nigeria",
        language: "English",
        link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
        pages: 209,
        title: "Things Fall Apart",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Hans Christian Andersen",
        country: "Denmark",
        language: "Danish",
        link: "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
        pages: 784,
        title: "Fairy tales",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Dante Alighieri",
        country: "Italy",
        language: "Italian",
        link: "https://en.wikipedia.org/wiki/Divine_Comedy\n",
        pages: 928,
        title: "The Divine Comedy",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Unknown",
        country: "Sumer and Akkadian Empire",

        language: "Akkadian",
        link: "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
        pages: 160,
        title: "The Epic Of Gilgamesh",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Unknown",
        country: "Achaemenid Empire",
        language: "Hebrew",
        link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
        pages: 176,
        title: "The Book Of Job",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Unknown",
        country: "India/Iran/Iraq/Egypt/Tajikistan",

        language: "Arabic",
        link: "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
        pages: 288,
        title: "One Thousand and One Nights",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Unknown",
        country: "Iceland",
        language: "Old Norse",
        link: "https://en.wikipedia.org/wiki/Nj%C3%A1ls_saga\n",
        pages: 384,
        title: "Nj\u00e1l's Saga",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Jane Austen",
        country: "United Kingdom",

        language: "English",
        link: "https://en.wikipedia.org/wiki/Pride_and_Prejudice\n",
        pages: 226,
        title: "Pride and Prejudice",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Honor\u00e9 de Balzac",
        country: "France",
        language: "French",
        link: "https://en.wikipedia.org/wiki/Le_P%C3%A8re_Goriot\n",
        pages: 443,
        title: "Le P\u00e8re Goriot",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Samuel Beckett",
        country: "Republic of Ireland",

        language: "French, English",
        link: "https://en.wikipedia.org/wiki/Molloy_(novel)\n",
        pages: 256,
        title: "Molloy, Malone Dies, The Unnamable, the trilogy",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Giovanni Boccaccio",
        country: "Italy",
        language: "Italian",
        link: "https://en.wikipedia.org/wiki/The_Decameron\n",
        pages: 1024,
        title: "The Decameron",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Jorge Luis Borges",
        country: "Argentina",
        language: "Spanish",
        link: "https://en.wikipedia.org/wiki/Ficciones\n",
        pages: 224,
        title: "Ficciones",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Emily Bront\u00eb",
        country: "United Kingdom",
        language: "English",
        link: "https://en.wikipedia.org/wiki/Wuthering_Heights\n",
        pages: 342,
        title: "Wuthering Heights",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Albert Camus",
        country: "Algeria, French Empire",
        language: "French",
        link: "https://en.wikipedia.org/wiki/The_Stranger_(novel)\n",
        pages: 185,
        title: "The Stranger",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Paul Celan",
        country: "Romania, France",
        language: "German",
        link: "\n",
        pages: 320,
        title: "Poems",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Louis-Ferdinand C\u00e9line",
        country: "France",
        language: "French",
        link: "https://en.wikipedia.org/wiki/Journey_to_the_End_of_the_Night\n",
        pages: 505,
        title: "Journey to the End of the Night",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Miguel de Cervantes",
        country: "Spain",
        language: "Spanish",
        link: "https://en.wikipedia.org/wiki/Don_Quixote\n",
        pages: 1056,
        title: "Don Quijote De La Mancha",
        read: false,
        genre: 'XYZ'
    },
    {
        author: "Geoffrey Chaucer",
        country: "England",
        language: "English",
        link: "https://en.wikipedia.org/wiki/The_Canterbury_Tales\n",
        pages: 544,
        title: "The Canterbury Tales",
        read: false,
        genre: 'XYZ'
    }
];


function router(nav){
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try{
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);
                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });
    return adminRouter;
}

module.exports = router;