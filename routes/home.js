const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/home', async (req, res) => {
  try {
    res.status(200).send('Please wake up Heroku!')
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
