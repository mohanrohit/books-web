const axios = require("axios");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const app = express();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/public/views`);

app.use(express.static(`${__dirname}/public`));

// code adapted from https://auth0.com/docs/quickstart/webapp/nodejs
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    cookie: {},
    resave: false,
    saveUninitialized: true
}));

var strategy = new Auth0Strategy({
        domain: `process.env.AUTH0_DOMAIN`,
        clientID: `process.env.AUTH0_CLIENT_ID`,
        clientSecret: `process.env.AUTH0_CLIENT_SECRET`,
        callbackURL: "http://localhost:8081/auth/callback",
        state: true
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request, response) => {
    response.render("index");
});

app.get("/books", async (request, response) => {
    const result = await axios.get("http://localhost:8080/api/v1/books");

    response.render("books", {books: result.data["books"]});
});

app.get("/books/:id", async (request, response) => {
    const result = await axios.get(`http://localhost:8080/api/v1/books/${request.params.id}`);

    response.render("book", {book: result.data});
});

app.listen(process.env.PORT || 8081, () => {
    console.log("Serving the books-web application");
});
