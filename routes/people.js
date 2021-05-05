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
  const personID = req.body.id
  const infoURL = `https://api.themoviedb.org/3/person/${personID}?api_key=${API_KEY}&language=en-US`
  const moviecreditsURL = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${API_KEY}&language=en-US`
  const tvcreditsURL = `https://api.themoviedb.org/3/person/${personID}/tv_credits?api_key=${API_KEY}&language=en-US&`

  try {
    // const info = await axios.get(infoURL)
    // const moviecredits = await axios.get(moviecreditsURL)
    // const tvcredits = await axios.get(tvcreditsURL)

    const promisechain = await Promise.all([axios.get(infoURL), axios.get(moviecreditsURL), axios.get(tvcreditsURL)])
    const personinfo = {
      info: promisechain[0].data,
      moviecredits: promisechain[1].data,
      tvcredits: promisechain[2].data
    }
    res.status(200).send(personinfo)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
