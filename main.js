const express = require("express");

const app = express();

app.use(express.static(__dirname));

app.get("/", (request, response) => {
    response.send("index.html");
});

app.listen(process.env.PORT || 8081, () => {
    console.log("Serving the books-web application");
});
