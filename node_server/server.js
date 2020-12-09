const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require('multer')
const path = require('path')

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

app.post("/test", (req,res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.send('send success')
})

app.use(express.static('./public'))

const storage = multer.diskStorage({
  destination: '.public/uploads/',
  filename: (req, file, cb) => {
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('inpFile');