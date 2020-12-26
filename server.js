/**
 * Contains all the routes for metacoin api invocation
 */

const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/books", require("./routes/books"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Demo with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "License: MIT",
        url: "https://spdx.org/licenses/MIT.html",
      }/*,
      contact: {
        name: "Gourav",
        url: "https://www.google.com",
        email: "Info@google.com"
      }*/
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/books.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);