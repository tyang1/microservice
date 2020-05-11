// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.

//need factory function here because implementation can lead to breaking changes while interface does not
// const getDatabase = require("../db/mongo.js");
// const dbInterface = require("../db/dbInterface.js");
// const dbMethods = require("../db/dbMethods.js");

let repo = (db) => {
  // TODO: implement dependency injection to abstract database methods
  let collection = dbInterface(db);

  const getAllMovies = async () => {
    return await collection.getAllMovies();
  };

  const getMovieById = async (id) => {
    return await collection.getMovieById(id);
  };

  const getMoviePremiers = async () => {
    return await collection.getMoviePremiers();
  };

  //this will close the databse connection:

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    getMovieById,
    getMoviePremiers,
    getAllMovies,
    disconnect,
  });
};

let connect = (connection) =>
  new Promise((resolve, reject) => {
    if (connection) {
      resolve(repo(connection));
    } else {
      reject(new Error("connection was unsuccessful"));
    }
  });

//only exports a connected repo

module.exports = Object.assign({}, { connect });
