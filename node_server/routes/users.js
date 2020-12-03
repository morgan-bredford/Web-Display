const router = require("express").Router();
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
  console.log(req.body)
  User.findOneAndUpdate({username: req.body[0].username},req.body[0],{new: true})
    .then(users => 
      res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/image").post((req, res) => {
    console.log(req.body)
    res.send('success')
});

module.exports = router;
