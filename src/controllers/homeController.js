// import DB
import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
  // execute log
  const [row, fields] = await pool.execute("SELECT * FROM users");

  // render data from DB
  return res.render("index.ejs", { dataUser: row });
};

let getDetailPage = async (req, res) => {
  // get a userId by params request
  let userId = req.params.id;

  // use SQL execute to get data from DB
  const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);

  // respon data from DB
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log("check request", req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) VALUES(?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let getAboutpage = (req, res) => {
  return res.send("Hello World From about page!");
};

module.exports = {
  getHomepage,
  getDetailPage,
  getAboutpage,
  createNewUser,
};
