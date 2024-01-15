import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
});

// connection.query("SELECT * FROM users", function (err, results, fields) {
//   console.log(">>Check mysql");
//   console.log(results); /* results contains */
// });

export default connection;
