const router = require("express").Router();
const fs = require("fs");

router.route("/").get((req, res) => {
  res.setHeader("Content-Type", "application/json");
  let rawdata = fs.readFileSync("./fakeusers.json");
  let myjson = JSON.parse(rawdata);
  res.end(JSON.stringify(myjson));
  console.log(JSON.stringify(myjson));
});

// router.route('/add').post((req, res) => {

// })

module.exports = router;
