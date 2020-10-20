# nodejs-graphql
<h1> A test case.</h1> </br>

### Using at least 2 libraries type-graphql and typeorm:</br>
1. Create mutations to create a book and an author in the database.</br>
2. Implement a request to get a list of books with authors. It is important to limit yourself to two queries to the database for one graphql query. For author use fieldResolver.</br>
3. Tests:</br>
* Creating an author</br>
* Book creation</br>
* Receive books without authors</br>
* Receiving books with authors Graphql schema types: </br>

```javascript
type Book {
  bookId: number;   
  name: string;
  pageCount: number; 
  authorId: number;  
  author: Author; 
}


type Author {
  authorId: number;
  name: string;
} 
```

An example of a query to graphql:</br> 

```javascript
query {
  books () {
    name
    author {
      name
    }
  }
}
```
To run JS - `npm run start`</br> 
To run TS - `npm run startts`