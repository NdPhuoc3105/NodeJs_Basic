// import DB
import connection from "../configs/connectDB";

let getHomepage = (req, res) => {
  // declare a data
  let data = [];

  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    results.map((row) => {
      data.push({
        id: row.id,
        email: row.email,
        firstName: row.firstName,
        lastName: row.lastName,
      });
    });

    // render data to page
    return res.render("index.ejs", { dataUser: JSON.stringify(data) });
  });
};

let getAboutpage = (req, res) => {
  return res.send("Hello World From about page!");
};

module.exports = {
  getHomepage: getHomepage,
  getAboutpage: getAboutpage,
};
