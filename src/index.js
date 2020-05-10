"use strict";
// we load all the depencies we need
const { EventEmitter } = require("events");
const server = require("./server/server");
const repository = require("./repository/repository");
const config = require("./config/");
const mediator = new EventEmitter();

// verbose logging when we are starting the server
console.log("--- Movies Service ---");
console.log("Connecting to movies repository...");

// log unhandled execpetions
process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception", err);
});
process.on("uncaughtRejection", (err, promise) => {
  console.error("Unhandled Rejection", err);
});

//setting event listeners on db connection
// e.g. for db.ready event, we want to send the
// connected db to repository, and then serve the server
// with the ready to use db handlers
const { db, dbSettings, serverSettings } = config;

let rep;
mediator.on("db.ready", (connection) => {
  repository
    .connect(connection)
    .then((repo) => {
      console.log("Repository Connected. Starting Server");
      rep = repo;
      return server.start({
        port: serverSettings.port,
        repo,
      });
    })
    .then((app) => {
      console.log(
        `Server started succesfully, running on port: ${config.serverSettings.port}.`
      );
      app.on("close", () => {
        rep.disconnect();
      });
    });
});

mediator.on("db.error", (err) => {
  console.error(err);
});

db.connect(dbSettings, mediator);
mediator.emit("boot.ready");
