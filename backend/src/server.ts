import app from "./app";
import config from "./config/config";

app.listen(config.get("port"), () =>
  console.log(`Server running on port ${config.get("port")}`)
);
