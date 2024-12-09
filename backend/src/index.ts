import express from "express";
import config from "./config/config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(config.get("port"), () =>
  console.log(`Server running on port ${config.get("port")}`)
);
