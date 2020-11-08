const router = require("express").Router();
//const fs = require("fs");
let User = require('../user.model')



router.route("/add").post((req, res) => {
console.log(req.body)
  const newUser = User(req.body)
  newUser.save( err => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(422).send({ succes: false, message: 'Tyvärr, det användarnamnet är redan upptaget. Vänligen välj ett nytt.' });
      }
      // Some other error
      return res.status(422).send(err);
    }

    res.json({
      success: true
    });
  } )
  //.catch(err => res.status(400).json('Error: ' + err))
  //res.send("success")
  console.log('saved')
});

router.route("/find").get((req, res) => {
  User.find({username: req.query.search})
  .then(user => res.send(user))
  .catch(err => res.send(err))
})

router.route('/update').post((req, res) => {
  User.findOneAndUpdate({username: req.body[0].username},{galleryimages: req.body[0].galleryimages},{new: true})
    .then(users => 
      res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/image").post((req, res) => {
    console.log(req.body)
    res.send('success')
});

  /*Download the base64 image in the server and returns the filename and path of image.*/
  function saveImage(baseImage) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    const uploadPath = "/home/documents/project";
    //path of folder where you want to save the image.
    const localPath = `${uploadPath}/uploads/images/`;
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random()*1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `Photo_${Date.now()}_${rand}.${ext}`;
    
    //Check that if directory is present or not.
    if(!fs.existsSync(`${uploadPath}/uploads/`)) {
        fs.mkdirSync(`${uploadPath}/uploads/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath+filename, base64Data, 'base64');
    return {filename, localPath};
}

module.exports = router;
