const router = require('express').Router()

const Order = require('../models/Order')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken')

// CREATE
router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body)

  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // take the parameter in body and set it again
      },
      { new: true } // this returns the new updated user by setting it to true
    )
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(400).json({ error: 'Order not updated' })
  }
})

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json('Order has been deleted...')
  } catch (error) {
    res.status(500).json({ error: 'be a valid user to delete' })
  }
})

// GET USER ORDERS, both user and admin can access it
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })

    res.status(200).json(orders)
  } catch (error) {
    res.status(403).json(error)
  }
})

// GET ALL CART
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()

    res.status(200).json(carts)
  } catch (error) {
    res.status(403).json(error)
  }
})

// GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ])
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
