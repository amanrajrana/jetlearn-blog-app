import express from "express";
import config from "./config/config";
import router from "./routers";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", router);

// This middleware can handle every possible error
app.use(globalErrorHandler);

app.listen(config.get("port"), () =>
  console.log(`Server running on port ${config.get("port")}`)
);
