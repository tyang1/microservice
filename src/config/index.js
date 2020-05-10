const { dbSettings, serverSettings } = require("./config");
const db = require("./mongodb-replicaset.js");

module.exports = Object.assign({}, { dbSettings, serverSettings, db });
