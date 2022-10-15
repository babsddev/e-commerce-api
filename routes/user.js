const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken')

const router = require('express').Router()

// UPDATE
router.put('./:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString()
  }

  try {
  } catch (error) {}
})

// router.get('/usertest', (req, res) => {
//   res.send('user test is successful')
// })

// // taking a request from the user
// router.post('/userposttest', (req, res) => {
//   const username = req.body.username // taking username from client/user, body is what we are passing to our serve
//   res.send('This is your username : ' + username)
// })

module.exports = router
