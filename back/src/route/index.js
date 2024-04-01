// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const AuthRoutes = require('./auth')
const EntryRoutes = require('./entry')
const Balance = require('./balance')

router.use('/auth', AuthRoutes)
router.use('/entry', EntryRoutes)
router.use('/balance', Balance)

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
