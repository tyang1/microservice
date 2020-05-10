function dbInterface(fns) {
  type: "movieDB";
  getCollection: (db) => {
    fns.getCollection(db);
  };
  getAllMovies: (promiseResolve, promiseReject) => {
    fns.getAllMovies(promiseResolve, promiseReject);
  };
  getMovieById: (id) => {
    fns.getMovieById(id);
  };
  getMoviePremiers: (movies) => {
    fns.getMoviePremiers(movies);
  };
}
