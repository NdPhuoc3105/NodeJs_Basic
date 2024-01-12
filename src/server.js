import express from "express";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
console.log(">>> check port:", port);

configViewEngine(app);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.send("Hello World From about page!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
