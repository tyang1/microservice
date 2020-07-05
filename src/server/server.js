/**
 Here what we are doing is, instantiating a new express app, verifying if 
we provide a repository and server port objects, then we apply some middleware to our express app, 
like morgan for logging, helmet for security, and a error handling function, 
and at the end we are exporting a start function to be able to start the server 😎.
*/
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const movieAPI = require("../api/movies-service-movies.js");

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error("The server must be started with a connected repo"));
    }
    if (!options.port) {
      reject(new Error("The server must be started with a avialable port"));
    }
    // let's init a express app, and add some middlewares
    const app = express();
    app.use(morgan("dev"));
    app.use(helmet());
    app.use((err, req, res, next) => {
      if (err) {
        reject(new Error(`something went wrong, err ${err}`));
        res.status(500).send("something went wrong");
      }
      next();
    });
    //we then add our API to express
    movieAPI(app, options);
    //finally we start the server and return the newly created server
    const server = app.listen(options.port, () => {
      resolve(server);
    });
  });
};

module.exports = Object.assign({}, { start });
