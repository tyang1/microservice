// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.

//need factory function here because implementation can lead to breaking changes while interface does not
// const getDatabase = require("../db/mongo.js");
// const dbInterface = require("../db/dbInterface.js");
// const dbMethods = require("../db/dbMethods.js");

let repo = (db) => {
  // TODO: implement dependency injection to abstract database
  //   let collection = deMethods.getCollection(dbInterface(db));
  let collection = db.collection("movies");

  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      collection.find().toArray((err, items) => {
        if (!err) {
          resolve(items);
        } else {
          reject(
            new Error(`An error occurred when fetching all movies, err: ${err}`)
          );
        }
      });
    });
  };

  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 };
      const sendMovie = (err, movie) => {
        if (err) {
          reject(
            new Error(
              `An error occurred when fetching a movie with ${id}, err:${err}`
            )
          );
        } else {
          resolve(movie);
        }
      };
      // fetch a movie by id -- mongodb syntax
      collection.findOne({ id: id }, projection, sendMovie);
    });
  };

  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = [];
      const currentDay = new Date();
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear(),
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2,
        },
        releaseDay: {
          $lte: currentDay.getDate(),
        },
      };
      const cursor = collection.find(query);
      const addMovie = (movie) => {
        movies.push(movie);
      };
      const sendMovies = (err) => {
        if (err) {
          reject(new Error("An error occured fetching all movies, err:" + err));
        }
        resolve(movies);
      };
      cursor.forEach(addMovie, sendMovies);
    });
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
