const MongoClient = require("mongodb");

const getMongoURL = (options) => {
  //options.servers
  //options.db
  const url = options.servers.reduce(
    (prev, cur) => prev + cur + ",",
    "mongodb://"
  );

  return `${url.substr(0, url.length - 1)}/${options.db}`;
};

//mongoDB function to connect, open and authenticate
const connect = (options, mediator) => {
  let url = getMongoURL(options);
  mediator.on("boot.ready", () => {
    MongoClient.connect(
      url,
      {
        db: options.dbParameters(),
        server: options.serverParameters(),
        replset: options.replsetParameters(options.repl),
      },
      (err, db) => {
        if (err) {
          mediator.emit('db.error', err)
        }else{
          mediator.emit('db ready', db)
        }
      }
    );
  });
};

module.exports = Object.assign({}, { connect });
