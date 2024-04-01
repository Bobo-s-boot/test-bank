const express = require('express')
const router = express.Router()
const randomString = require('randomstring')

let currentBalance = 0
let transactions = []
let sendings = []
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const users = [
  {
    name: 'Oleg.V',
    email: 'userTest1@gmail.com',
    password: '7739Gaga!L',
  },
  {
    name: 'Lera.Y',
    email: 'userTest2@gmail.com',
    password: '12648Fiha$',
  },
]

function generatIdCode() {
  const codeId = randomString.generate({
    length: 6,
    charset: 'numeric',
  })
  return codeId
}

router.post('/amount', (req, res) => {
  const { amount, paymentSystem } = req.body

  if (
    amount !== undefined &&
    !isNaN(amount) &&
    paymentSystem
  ) {
    const now = new Date()
    const transactionId = generatIdCode()
    const transaction = {
      id: transactionId,
      amount: parseFloat(amount),
      type:
        paymentSystem === 'Stripe'
          ? 'Receipt'
          : paymentSystem === 'Coinbase'
          ? 'Receipt  '
          : '',

      timestamp: {
        date: now.getDate(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
      },
      monthName: months[now.getMonth()],
    }

    transactions.push(transaction)

    if (paymentSystem === 'Stripe') {
      currentBalance += transaction.amount
    } else if (paymentSystem === 'Coinbase') {
      currentBalance += transaction.amount
    }

    res.json({
      message: 'Amount saved successfully',
      id: transactionId,
    })
  } else {
    res.status(400).json({
      message: 'Invalid amount or payment system selected',
    })
  }
})

router.get('/balance', (req, res) => {
  res.json({
    balance: currentBalance,
    transactions: transactions,
    sendings: sendings,
  })
})

router.get('/balance/:transactionId', (req, res) => {
  const { transactionId } = req.params

  const transaction = transactions.find(
    (t) => t.id === transactionId,
  )

  if (transaction) {
    res.json({ transaction })
  } else {
    res
      .status(404)
      .json({ message: 'Transaction not found' })
  }
})

router.post('/send', (req, res) => {
  const { sum, email } = req.body

  const foundUser = users.find(
    (user) => user.email === email,
  )

  if (foundUser) {
    const userName = foundUser.name
    const userEmail = foundUser.email

    if (
      sum !== undefined &&
      !isNaN(sum) &&
      parseFloat(sum) > 0
    ) {
      if (parseFloat(sum) <= currentBalance) {
        currentBalance -= parseFloat(sum)

        const now = new Date()
        const sendingId = generatIdCode()
        const sending = {
          id: sendingId,
          name: userName,
          email: userEmail,
          amount: parseFloat(sum),
          type: 'Sending',

          timestamp: {
            date: now.getDate(),
            hours: now.getHours(),
            minutes: now.getMinutes(),
          },
          monthName: months[now.getMonth()],
        }

        sendings.push(sending)

        return res.json({
          message: 'Amount successfully sent',
          id: sendingId,
          sending,
        })
      }
    } else {
      return res
        .status(400)
        .json({ error: 'Invalid sum provided' })
    }
  } else {
    return res.status(404).json({
      error: 'User not found with the provided email',
    })
  }
})

router.get('/balance/:sendingId', (req, res) => {
  const { sendingId } = req.params

  const send = sendings.find(
    (user) => user.id === sendingId,
  )

  console.log(send)

  if (send) {
    res.json({ send })
  } else {
    res.status(404).json({ message: 'Sending not found' })
  }
})
module.exports = router
