// import DB
import pool from "../configs/connectDB";

// get all users row
let getAllUsers = async (req, res) => {
  const [row] = await pool.execute("SELECT * FROM users");

  return res.status(200).json({
    message: "ok",
    data: row,
  });
};

// create a new user
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;

  //   check validate
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing require params",
    });
  }
  //
  // add user into users
  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) VALUES(?,?,?,?)",
    [firstName, lastName, email, address]
  );

  return res.status(200).json({
    message: "ok",
  });
};

// update a user
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;

  //   check validate
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing require params",
    });
  }

  await pool.execute(
    "UPDATE users SET firstName = ? , lastName = ?, email = ?, address = ? WHERE id = ?",
    [firstName, lastName, email, address, id]
  );
  //
  return res.status(200).json({
    message: "ok",
  });
};

// delete a user
let deleteUser = async (req, res) => {
  let userId = req.params.id;
  //   check validate
  if (!userId) {
    return res.status(200).json({
      message: "missing require params",
    });
  }

  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

  //
  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
