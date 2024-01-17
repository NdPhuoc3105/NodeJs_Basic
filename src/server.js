import express from "express";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();
import initWebRoute from "./routes/initWebRoute";
import initApiRoute from "./routes/api";

// connect DB
// import pool from "./configs/connectDB";

const app = express();
const port = process.env.PORT || 8080;
console.log(">>> check port:", port);

// express config to POST method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view Engine
configViewEngine(app);

// init web Route
initWebRoute(app);

// init API Route
initApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
