const router = require("express").Router();
const fs = require("fs");

router.route("/").get((req, res) => {
  res.set("Content-Type", "application/json");
  let rawdata = fs.readFileSync("./fakeusers.json");
  let usersjson = JSON.parse(rawdata);
  //console.log(usersjson[0]);
  res.send(usersjson);
  //   res.end(JSON.stringify(usersjson));
  //   console.log(JSON.stringify(usersjson));
});

router.route("/add").post((req, res) => {
  let rawdata1 = fs.readFileSync("./fakeusers.json");
  let usersjson = JSON.parse(rawdata1);
  req.on("data", (chunk) => {
    //console.log("A chunk of data has arrived: ", JSON.parse(chunk));
    insertdata = JSON.parse(chunk);
    let updatedjson = usersjson.push(insertdata);
    fs.writeFile("fakeusers.json", updatedjson, "utf8", () =>
      console.log("callback")
    );
  });
  //   let rawdata = fs.readFileSync("fakeusers.json");
  //   let ptest = JSON.parse(rawdata);
  //   res.end(JSON.stringify(ptest));
  res.send("success");
});

module.exports = router;
