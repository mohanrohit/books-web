const express = require("express");

const app = express();

const books = [
    "Harry Potter and the Sorcerer's Stone",
    "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Prisoner of Azkaban",
    "Harry Potter and the Goblet of Fire",
    "Harry Potter and the Order of the Phoenix",
    "Harry Potter and the Half-Blood Prince",
    "Harry Potter and the Deathly Hallows"
];

app.set("view engine", "ejs");
app.set("views", `${__dirname}/public/views`);

app.use(express.static(`${__dirname}/public`));

app.get("/", (request, response) => {
    response.render("index");
});

app.get("/books", (request, response) => {
    response.render("books", {books: books});
});

app.get("/books/:id", (request, response) => {
    response.render("book", {book: books[parseInt(request.params.id)]});
});

app.listen(process.env.PORT || 8081, () => {
    console.log("Serving the books-web application");
});
