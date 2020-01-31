/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secret')

module.exports = (req, res, next) => {
 const token = req.headers.authorization

 if(token){
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(err){
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        next()
      }
    })
 } else {
  res.status(401).json({message: "Please insert token"})
 }
};
