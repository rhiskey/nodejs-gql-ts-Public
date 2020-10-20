var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
//For older versions of Node:
var { URLSearchParams } = require('url');
global.URLSearchParams = URLSearchParams
// var {Entity, PrimaryGeneratedColumn, Column} = require('typeorm');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input AuthorInput{
    name: String
  }

  input BookInput{
    name: String
    pageCount: Int
    authorId: ID
    author: String
  }

  type Author{
    authorId: Int
    name: String
  }

  type Book{
    bookId: Int
    name: String
    pageCount: Int
    authorId: Int
    author: [Author]
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createAuthor(input: AuthorInput): Author
    createBook(input: BookInput): Book
  }
`);

// If Book had any complex fields, we'd put them on this object.
//TODO Link with Author
class Book {
  constructor(id, { name, pageCount, authorId, author }) {
    this.bookId = id;
    this.name = name;
    this.pageCount = pageCount;
    this.authorId = authorId;
    this.author = author;
  }
}

//Author Class
class Author {
  constructor(id, { name }) {
    this.authorId = id;
    this.name = name;
  }
}


// Maps Authors/Books to content
var fakeDatabase = {};

// Reslover
var root = {
  Query: {
    books: async () => {
      return ORM.getAllBooks()
    }
  },
  Book: {
    authors: async (bookObj, args) => {
      return ORM.getAuthorsBy(bookObj.bookId)
    }
  },

  //TODO
  createBook: ({ input }) => {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Book(id, input);
  },

  //TODO
  createAuthor: ({ input }) => {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Author(id, input);
  },

};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');