require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const API_KEY = process.env.API_KEY

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/popularMovies', async (req, res) => {
  const page = req.body.page || 1
  const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`

  try {
    const popular = await axios.get(popularURL)
    console.log('results sent to client!')
    res.status(200).send(popular.data)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

router.post('/fullmovieInfo', async (req, res) => {
  const movieID = req.body.id
  const fullInfoURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
  const creditsURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
  const recsURL = `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}&language=en-US`
  const providersURL = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${API_KEY}&language=en-US`

  try {
    // const info = await axios.get(fullInfoURL)
    // const credits = await axios.get(creditsURL)
    // const recs = await axios.get(recsURL)
    // const providers = await axios.get(providersURL)

    // Huge optimization
    const promisechain = await Promise.all([axios.get(fullInfoURL), axios.get(creditsURL), axios.get(recsURL), axios.get(providersURL)])
    console.log(promisechain)

    if (promisechain[0].data.budget === 0) {
      promisechain[0].data.budget = 'No Budget Listed'
    }
    if (promisechain[0].data.revenue === 0) {
      promisechain[0].data.revenue = 'No Revenue Listed'
    }

    const movieinfo = {
      info: promisechain[0].data,
      credits: promisechain[1].data,
      recs: promisechain[2].data,
      providers: promisechain[3].data
    }

    console.log(movieinfo)

    res.status(200).send(movieinfo)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
