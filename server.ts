// import * as _ from "lodash";
import { createConnection, ConnectionOptions } from "typeorm";
import { Author } from "./src/entity/AuthorModel";
import { Book } from "./src/entity/BookModel";
require('dotenv').config();
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

// import '@babel/polyfill'
// import express from 'express'
// const bodyParser = require('body-parser')
// const { ApolloServer } = require('apollo-server-express')
// const cors = require('cors')
// const app = express()
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())

// const server = new ApolloServer({
//     modules: [
//         require('./GraphQL/tickets'),
//         require('./GraphQL/status'),
//         require('./GraphQL/users'),
//         require('./GraphQL/priorities'),
//     ],
// })

// server.applyMiddleware({ app })

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen({ port: 5000 }, () =>
//     console.log(`🚀 Server ready at http://localhost:5000`),
// )


// Generate Author and Book name
const authorConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: '-',
    length: 2,
};

const bookConfig: Config = {
    dictionaries: [colors],
    separator: ' ',
    length: 1,
};

// Database Settings
const options: ConnectionOptions = {
    // TODO Docker Database Connection

    type: 'mssql', // Used to be process.env.DB_DIALECT
    host: process.env.DB_HOST || 'localhost\\MSSQLSERVER',
    port: 1433, // Used to be process.env.DB_PORT
    username: process.env.DB_USERNAME || 'db_user',
    password: process.env.DB_PASSWORD || 'db_password',
    database: process.env.DB_NAME || 'TEST',
    extra: {
        trustedConnection: true
    },
    options: {
        useUTC: true,
    },
    entities: [Author, Book],
    logging: true,
};
// Database Settings
export const optionsMySQL: ConnectionOptions = {
    // TODO Docker Database Connection

    type: 'mysql', // Used to be process.env.DB_DIALECT
    host: process.env.DB_HOST_MYSQL || 'localhost',
    port: 3306, // Used to be process.env.DB_PORT
    username: process.env.DB_USERNAME_MYSQL || 'db_user',
    password: process.env.DB_PASSWORD_MYSQL  || 'db_password',
    database: process.env.DB_NAME_MYSQL  || 'TEST',
    extra: {
        trustedConnection: true
    },
    // options: {
    //     useUTC: true,
    // },
    entities: [Author, Book],
    logging: true,
};


function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Options - mssql, optionsMySQL
createConnection(optionsMySQL).then(async connection => {
    // Table name = "author". Create a few authors
    var authorsCount = new Array(getRandomInt(5));
    var authorsArr = new Array();
    var savedAuthors = new Array();

    for (var item of authorsCount) { 
        let author = new Author();
        author.name = uniqueNamesGenerator(authorConfig);
        authorsArr = authorsArr.concat(author);
        savedAuthors = savedAuthors.concat(await connection.manager.save(author));
    }
    
    //author1.books = [book1];
    //await connection.manager.save(author1);

    // Table name = "book". Create a few books
    let book1 = new Book();
    book1.name = uniqueNamesGenerator(bookConfig);
    book1.pageCount = getRandomInt(1000);
    // book.authors = [author1, author2];

    //book1.author = savedAuthors;
    //book1.authorId = 14;
    
    // book1.author = authorsArr;
    //book1.author?.name=authorsArr;
    //book.author = authorsArr; //TODO In Database no Authors

    await connection.manager.save(book1);

    // Now our book is saved and authors are attached to it
    // Now lets load them:
    const books = await connection
        .getRepository(Book)
        //.find({relations: ["authors"]});
        .createQueryBuilder("book")
        
        //ManyToOne
        .innerJoinAndSelect("book.author", "author")

        // .leftJoinAndSelect("book.author", "author")
        .orderBy("book.bookId", "DESC")
        .getMany();

    //console.log("Authors are saved, and relation between author and book is created in the database too");
    console.log(books);

    // const bookswo = await connection
    //     .getRepository(Book)
    //     //.find({relations: ["authors"]});
    //     //.find(1, { relations: ["authors"] });
    //     .createQueryBuilder("book")
    //     //ManyToOne
    //     //.innerJoinAndSelect("book.authors", "authors")

    //     //ManyToMany
    //     .leftJoinAndSelect("book.author", "author")
    //     .orderBy("book.bookId", "DESC")
    //     // .setParameters({ bookoName: "My", AuthorName: "Mishka" })
    //     .getMany();

    // //console.log("Authors are saved, and relation between author and book is created in the database too");
    // console.log(bookswo);



}).catch((error: any) => console.log(error));