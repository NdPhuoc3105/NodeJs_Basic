import express from "express";

const configViewEngine = (app) => {
  // declare public folder
  app.use(express.static("./src/public"));

  // Config and setup file view
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

export default configViewEngine;
