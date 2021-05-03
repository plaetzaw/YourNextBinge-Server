require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const API_KEY = process.env.API_KEY

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/popularPeople', async (req, res) => {
  const page = req.body.page || 1
  console.log(page)
  const popularURL = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`

  try {
    const popular = await axios.get(popularURL)
    res.status(200).send(popular.data)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

router.post('/personInfo', async (req, res) => {
  const person_id = req.body.id
  console.log(person_id)
  const infoURL = `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}&language=en-US`
  const moviecreditsURL = `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`
  const tvcreditsURL = `https://api.themoviedb.org/3/person/${person_id}/tv_credits?api_key=${API_KEY}&language=en-US&`

  try {
    const info = await axios.get(infoURL)
    const moviecredits = await axios.get(moviecreditsURL)
    const tvcredits = await axios.get(tvcreditsURL)
    const personinfo = {
      info: info.data,
      moviecredits: moviecredits.data,
      tvcredits: tvcredits.data
    }
    res.status(200).send(personinfo)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
