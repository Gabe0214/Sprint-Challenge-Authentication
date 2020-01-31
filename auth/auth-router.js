const router = require('express').Router();

const userDb = require('./auth-modal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secret')

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

  const { username, password } = req.body
  
     userDb.findByUsername(username)
     .then( user => {
       if(user && bcrypt.compare(password, user.password)){
         const token = signToken(user)
         res.status(201).json({token})
       } else {
         res.status(500).json({message: "please insert valid user or password"})
       }
     })
     .catch(err => {
       console.log(err)
       res.status(500).json({message: "Something is wrong with the server"})
     })
});


function signToken(user){
  const payload = {
    userId: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
