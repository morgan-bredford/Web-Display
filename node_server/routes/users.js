const router = require("express").Router();
const fs = require("fs");
let User = require('../user.model')

router.route("/").get((req, res) => {
  res.set("Content-Type", "application/json");
  let rawdata = fs.readFileSync("./fakeusers.json");
  let usersjson = JSON.parse(rawdata);
  //console.log(usersjson[0]);
  res.send(usersjson);
  //   res.end(JSON.stringify(usersjson));
  //   console.log(JSON.stringify(usersjson));
});

// router.route("/add").post((req, res) => {
//   let rawdata1 = fs.readFileSync("./fakeusers.json");
//   let usersjson = JSON.parse(rawdata1);
//   usersjson.push(req.body);
//   fs.writeFile("fakeusers.json", JSON.stringify(usersjson), "utf8", () =>
//     console.log("callback")
//   );



  // req.on("data", (chunk) => {
  //   console.log("A chunk of data has arrived: ", JSON.parse(chunk));
  //   let newpostdata = JSON.parse(chunk)
  //   usersjson.push(newpostdata)
  //   fs.writeFile("fakeusers.json", JSON.stringify(usersjson), "utf8", () =>
  //     console.log("callback")
  //   );
  //   console.log(usersjson)
  // });
  //res.send("success");
router.route("/add").post((req, res) => {
  const newUser = User(req.body)
  newUser.save()
  .catch(err => res.status(400).json('Error: ' + err))
  console.log('saved')
});
router.route("/find").get((req, res) => {
  User.find({height: 222})
  .then(user => res.send(JSON.parse(user)))
})
module.exports = router;
