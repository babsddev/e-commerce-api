const router = require('express').Router()

router.get('/usertest', (req, res) => {
  res.send('user test is successful')
})

// taking a request from the user
router.post('/userposttest', (req, res) => {
  const username = req.body.username // taking username from client/user, body is what we are passing to our serve
  res.send('This is your username : ' + username)
})

module.exports = router
