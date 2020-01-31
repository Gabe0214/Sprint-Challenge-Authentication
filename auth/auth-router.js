const router = require('express').Router();

const userDb = require('./auth-modal')
const bcrypt = require('bcryptjs')


router.post('/register', (req, res) => {
  // implement registration
  const { username, password } = req.body

 userDb.insert({ username, password: bcrypt.hashSync(password, 5) })
 .then(user => {
   res.status(200).json({id: user.id, username: user.username})
 })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "Something is wrong with the server"})
  })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
