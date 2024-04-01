const express = require('express')
const randomString = require('randomstring')
const router = express.Router()

let userData = {}
let serverCodes = {}

function generateCode() {
  const verificationCode = randomString.generate({
    length: 6,
    charset: 'numeric',
  })

  return verificationCode
}

router.post('/signup', (req, res) => {
  const { email, password } = req.body
  const REG_EXP_EMAIL = new RegExp(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
  )
  const REG_EXP_PASSWORD = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%^&*()_+]).{8,}$/,
  )

  const isEmailValid = REG_EXP_EMAIL.test(email)
  const isPasswordValid = REG_EXP_PASSWORD.test(password)

  if (userData[email]) {
    return res
      .status(400)
      .json({ error: 'The user has already been created' })
  }

  if (!isEmailValid || !isPasswordValid) {
    return res.status(400).json({
      error: 'Invalid email or password format',
    })
  }

  const verificationCode = generateCode()
  serverCodes[email] = verificationCode
  userData[email] = { password, verificationCode }

  console.log(
    `Verification Code for ${email}: ${verificationCode}`,
  )

  res.json({ message: 'The code is successfully sent' })
})

router.post('/signup-confirm', (req, res) => {
  const { code, email } = req.body

  console.log('Received code:', code)
  console.log('Server codes:', serverCodes)

  if (serverCodes[email] === code) {
    res.json({ message: 'Corect code' })
  } else {
    res.status(401).json({ error: 'Incorect code' })
  }
})

module.exports = router
