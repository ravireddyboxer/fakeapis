const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGODB;

let client = null;
try {
  client = new MongoClient(connectionString);
} catch (error) {
  console.log(error);
}
console.log("connection status");

module.exports = client;
