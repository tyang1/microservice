const movieMongo = {
  getCollection: (db) => {
    return db.collection("movies");
  },
};

export default movieMongo;
