// import DB
import pool from "../configs/connectDB";

// import multer
import multer from "multer";

// render User to table
let getHomepage = async (req, res) => {
  // execute log
  const [row, fields] = await pool.execute("SELECT * FROM users");

  // render data from DB
  return res.render("index.ejs", { dataUser: row });
};

// View detail User
let getDetailPage = async (req, res) => {
  // get a userId by params request
  let userId = req.params.id;

  // use SQL execute to get data from DB
  const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);

  // response data from DB
  return res.send(JSON.stringify(user));
};

// Add a new User
let createNewUser = async (req, res) => {
  console.log("check request", req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) VALUES(?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

// Edit A User
let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "UPDATE users SET firstName = ? , lastName = ?, email = ?, address = ? WHERE id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

// Delete a User
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.redirect("/");
};

// Other Page - About
let getAboutpage = (req, res) => {
  return res.send("Hello World From about page!");
};

// UPload File Page
let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

/* handle UPLOAD */
const upload = multer().single("profile_pic");

//  Check Validate and Handle Upload File
let handleUploadFile = async (req, res) => {
  // check validate file
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      /* img tag configs the source file */
      `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  getEditPage,
  postUpdateUser,
  deleteUser,
  getAboutpage,
  getUploadFilePage,
  handleUploadFile /* handle Upload a file */,
};
