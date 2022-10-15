const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.body

  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return res.status.json('token is not valid')
      req.user = user
      next()
    })
  } else {
    return res.status(401).json('you are not authenticated')
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json('get lost bitch!')
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuthorization }
