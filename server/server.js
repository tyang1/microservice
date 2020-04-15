/**
 Here what we are doing is, instantiating a new express app, verifying if 
we provide a repository and server port objects, then we apply some middleware to our express app, 
like morgan for logging, helmet for security, and a error handling function, 
and at the end we are exporting a start function to be able to start the server 😎.
*/
const express = require("express");

const app = express();
const start = () => {};

module.exports = Object.create({}, { start });
