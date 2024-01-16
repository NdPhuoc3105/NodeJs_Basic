import express from "express";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();
import initWebRoute from "./routes/web";

// connect DB
import pool from "./configs/connectDB";

const app = express();
const port = process.env.PORT || 8080;
console.log(">>> check port:", port);

// view Engine
configViewEngine(app);

// init web Route
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
