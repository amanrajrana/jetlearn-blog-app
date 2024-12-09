import mysql from "mysql2/promise";
import config from "./config";

const db = mysql.createPool({
  host: config.get("dbHost"),
  user: config.get("dbUser"),
  password: config.get("dbPassword"),
  database: config.get("dbName"),
  port: Number(config.get("dbPort")),
});

db.getConnection()
  .then((connection) => {
    console.log("Connected to the database");
    connection.release();
  })
  .catch((err) => {
    console.error("Database error", err);
  });

export default db;
