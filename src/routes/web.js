import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

const initWebRoute = (app) => {
  // render table
  router.get("/", homeController.getHomepage);

  // render details
  router.get("/detail/user/:id", homeController.getDetailPage);

  // create user
  router.post("/create-new-user", homeController.createNewUser);

  // update user
  router.get("/edit-user/:id", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);

  // create user
  router.post("/delete-user", homeController.deleteUser);

  //
  // about Page
  router.get("/about", homeController.getAboutpage);

  //   after slash `/` for homeController
  return app.use("/", router);
};

export default initWebRoute;
