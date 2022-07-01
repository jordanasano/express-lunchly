"use strict";

/** Database for lunchly */

const { Client } = require("pg");

// const DB_URI = process.env.NODE_ENV === "test"
//     ? "postgresql:///lunchly_test"
//     : "postgresql:///lunchly";

const DB_URI = process.env.NODE_ENV === "test"
  ? "postgresql://jasano:foofoo@localhost/lunchly_test"
  : "postgresql://jasano:foofoo@localhost/lunchly";

let db = new Client({
  connectionString: DB_URI,
});

db.connect();


module.exports = db;
