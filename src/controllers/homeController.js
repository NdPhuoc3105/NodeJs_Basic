// import DB
import pool from "../configs/connectDB";

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

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  getEditPage,
  postUpdateUser,
  deleteUser,
  getAboutpage,
};
