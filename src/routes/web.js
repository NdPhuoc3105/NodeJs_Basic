import express from "express";
import homeController from "../controllers/homeController";

// upload file
import multer from "multer";
import path from "path";

var appRoot = require("app-root-path");

let router = express.Router();

// handle Upload-File
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/images/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let uploadMultipleFiles = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple_images", 3);

//
// Routes
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

  // upload file:
  router.get("/upload", homeController.getUploadFilePage);
  //
  // handle Upload-file
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );

  // handle upload Multiple-files:
  router.post(
    "/upload-multiple-images",
    (req, res, next) => {
      uploadMultipleFiles(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          // handle multer file limit error here
          res.send("LIMIT_UNEXPECTED_FLIE");
        } else if (err) {
          res.send(err);
        } else {
          // make sure to call next() if all was well
          next();
        }
      });
    },
    homeController.handleUploadMultipleFiles
  );

  // about Page
  router.get("/about", homeController.getAboutpage);

  //   after slash `/` for homeController
  return app.use("/", router);
};

export default initWebRoute;
