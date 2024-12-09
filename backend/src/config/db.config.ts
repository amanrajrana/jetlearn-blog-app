import mysql from "mysql2/promise";
import config from "./config";

const db = mysql.createPool({
  host: config.get("dbHost"),
  user: config.get("dbUser"),
  password: config.get("dbPassword"),
  database: config.get("dbName"),
  port: Number(config.get("dbPort")),
});

export default db;
