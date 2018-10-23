require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/app/views`);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

async function authorize(request, response, next)
{
    if (request.body.access_token)
    {
        return next();
    }

    var result = await axios.post(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
        client_id: `${process.env.AUTH0_CLIENT_ID}`,
        client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
        grant_type: "client_credentials",
        audience: `${process.env.AUTH0_AUDIENCE}`
    });

    if (!result.data.access_token)
    {
        response.send({error: {code: 401, message: "Unauthorized"}});

        return;
    }

    request.accessToken = result.data.access_token;
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${request.accessToken}`;

    return next();
}

app.get("/", (request, response) => {
    response.render("index");
});

app.get("/books", authorize, async (request, response) => {
    const result = await axios.get("http://localhost:8080/api/v1/books");

    response.render("books", {books: result.data["books"]});
});

app.get("/books/:id", async (request, response) => {
    const result = await axios.get(`http://localhost:8080/api/v1/books/${request.params.id}`);

    response.render("book", {book: result.data});
});

app.listen(process.env.PORT || 8081, () => {
    console.log("Serving the Books web application");
});
