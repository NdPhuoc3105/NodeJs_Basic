// import DB
import pool from "../configs/connectDB";

// import multer:
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

// get Upload-file Page
let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

// handle form Upload-file:
//
let handleUploadFile = async (req, res) => {
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
  );
};

let handleUploadMultipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};

// Other Page - About
let getAboutpage = (req, res) => {
  return res.send("Hello World From about page!");
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  getEditPage,
  postUpdateUser,
  deleteUser,
  getUploadFilePage /* get Upload File Page */,
  handleUploadFile /* handle upload-file */,
  handleUploadMultipleFiles /* handle upload-multiple-file */,
  getAboutpage,
};
