const express = require('express')
const router = express.Router()
const randomString = require('randomstring')

let serverCode = {}
let currentUserEmail = null

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

function isAuthenticated(req, res, next) {
  if (currentUserEmail) {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

router.post('/emails', isAuthenticated, (req, res) => {
  res.json({ email: currentUserEmail })
})

function generateCode() {
  const verificationCode = randomString.generate({
    length: 6,
    charset: 'numeric',
  })

  return verificationCode
}

router.post('/signin', (req, res) => {
  const { email, password } = req.body

  console.log(`Email: ${email}, password: ${password}`)

  const foundUser = users.find(
    (user) =>
      user.email === email && user.password === password,
  )

  if (foundUser) {
    currentUserEmail = email
    return res.json({ message: 'Correct data user' })
  }

  res.status(400).json({ error: 'Incorrect user data' })
})

router.post('/recovery', (req, res) => {
  const { email } = req.body

  const verificationCode = generateCode()
  serverCode[email] = verificationCode

  console.log(`Email: ${email}, Code: ${verificationCode}`)

  const foundUser = users.find(
    (user) => user.email === email,
  )

  if (foundUser) {
    currentUserEmail = email
    return res.json({ message: 'Correct email address' })
  }

  res.status(401).json({ error: 'Incorrect email' })
})

router.post('/recovery-confirm', (req, res) => {
  const { code, password, email } = req.body

  if (code === serverCode[email] && password) {
    const foundUser = users.find(
      (user) => user.email === email,
    )

    if (foundUser) {
      currentUserEmail = email
      foundUser.password = password
    }

    console.log(
      `Code: ${code}, Email: ${email}, Password: ${password} `,
    )

    return res.json({ message: 'Correct data user' })
  }

  res.status(401).json({ error: 'Incorrect user data' })
})

router.post('/settings-email', (req, res) => {
  const { email, password } = req.body

  const foundUser = users.find(
    (user) => user.password === password && email === email,
  )

  if (foundUser) {
    foundUser.email = email
    currentUserEmail = email

    return res.json({ message: 'Correct data user' })
  }

  res.status(401).json({ error: 'Incorrect user data' })
})

router.post('/settings-password', (req, res) => {
  const { oldPassword, newPassword } = req.body

  const foundUserPassword = users.find(
    (user) => user.password === oldPassword,
  )

  if (foundUserPassword) {
    foundUserPassword.password = newPassword

    return res.json({ message: 'Corect password user' })
  }

  res.status(401).json({ error: 'Incorect password user' })
})

router.post('/send', (req, res) => {
  const { email } = req.body

  const findEmail = users.find(
    (user) => user.email === email,
  )

  if (findEmail) {
    res.json({ message: 'Corect email address' })
  } else {
    res
      .status(404)
      .json({ error: 'Incorect email address' })
  }
})

router.post('/notic', isAuthenticated, (req, res) => {
  const now = new Date()

  function getDaysAgo(date, days) {
    const daysAgoTime =
      date.getTime() - days * 24 * 60 * 60 * 1000
    const daysAgoDate = new Date(daysAgoTime)
    return daysAgoDate.getDay()
  }

  const announcementDay = getDaysAgo(now, 3)

  const warningDay = getDaysAgo(now, 2)

  const announcementNotification = {
    id: '1',
    image: '/svg/notic-black.svg',
    title: 'New reward system',
    type: 'Announcement',
    day: announcementDay,
  }

  const warningNotification = {
    id: '2',
    image: '/svg/danger.svg',
    title: 'New login',
    type: 'Warning',
    day: warningDay,
  }

  res.json({
    message: 'Notification added successfully',
    announcementNotification,
    warningNotification,
  })
})

module.exports = router
