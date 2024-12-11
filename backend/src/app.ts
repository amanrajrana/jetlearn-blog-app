import express from "express";
import router from "./routers";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", router);

// This middleware can handle every possible error
app.use(globalErrorHandler);

export default app;
