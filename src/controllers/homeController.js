let getHomepage = (req, res) => {
  return res.render("index.ejs");
};

let getAboutpage = (req, res) => {
  return res.send("Hello World From about page!");
};

module.exports = {
  getHomepage: getHomepage,
  getAboutpage: getAboutpage,
};
