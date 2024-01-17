import express from "express";
import apiController from "../controllers/apiController";

let router = express.Router();

const initApiRoute = (app) => {
  // method GET -> Read Data
  router.get("/users", apiController.getAllUsers);

  // method POST -> Create row in Data
  router.post("/create-user", apiController.createNewUser);

  // method PUT > UPDATE Data
  router.put("/update-user", apiController.updateUser);

  // method DELETE >> delete data
  router.delete("/delete-user/:id", apiController.deleteUser);

  //   api version 1 users
  return app.use("/api/v1/", router);
};

export default initApiRoute;
