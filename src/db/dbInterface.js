function dbInterface(db) {
  try {
    let movieCollection = db.collection("movies");
    if (movieCollection)
      return {
        getCollection: () => {},
        getAllMovies: () => {
          return new Promise((resolve, reject) => {
            collection.find().toArray((err, items) => {
              if (!err) {
                resolve(items);
              } else {
                reject(
                  new Error(
                    `An error occurred when fetching all movies, err: ${err}`
                  )
                );
              }
            });
          });
        },
        getMovieById: (id) => {
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
        },
        getMoviePremiers: () => {
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
                reject(
                  new Error("An error occured fetching all movies, err:" + err)
                );
              }
              resolve(movies);
            };
            cursor.forEach(addMovie, sendMovies);
          });
        },
      };
  } catch (err) {
    console.log(err);
  }
}
