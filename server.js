import express from "express";
import logger from "./middlewares/logger.js";
import router from "./router/router.js";
import cors from "cors";
import { connectToDb } from "./DB/dbService.js";
import chalk from "chalk";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
  })
);

app.use(express.json());
app.use(logger);
app.use(express.static("./public"));
app.use(router);

app.use((error, req, res, next) => {
  console.log(error);

  res.status(500).send("server internal error");
});

app.listen(port, () => {
  console.log(chalk.blueBright("server is listening to port " + port));
  connectToDb();
});
