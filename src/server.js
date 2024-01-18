import express from "express";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();
import initWebRoute from "./routes/web";
import initApiRoute from "./routes/api";
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 8080;
console.log(">>> check port:", port);

//
// myself MiddleWare
app.use((req, res, next) => {
  // check !valid ---> res.send()
  console.log(">> run into my middleware");
  console.log(req.method);
  // else -----> next()
  next();
});

// morgan logging
app.use(morgan("combined"));

// express config to POST method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view Engine
configViewEngine(app);

// init web Route
initWebRoute(app);

// init API Route
initApiRoute(app);

//
// 404 not found - MiddleWare
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
