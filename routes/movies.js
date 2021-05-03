require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const API_KEY = process.env.API_KEY

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/popularMovies', async (req, res) => {
  const page = req.body.page || 1
  console.log(page)
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
  const movie_id = req.body.id
  const fullInfoURL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
  const creditsURL = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
  const recsURL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US`
  const providersURL = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY}&language=en-US`

  try {
    const info = await axios.get(fullInfoURL)
    if (info.data.budget === 0) {
      info.data.budget = 'No Budget Listed'
    }
    if (info.data.revenue === 0) {
      info.data.revenue = 'No Revenue Listed'
    }
    const credits = await axios.get(creditsURL)
    console.log(credits)
    const recs = await axios.get(recsURL)
    const providers = await axios.get(providersURL)
    const movieinfo = {
      info: info.data,
      credits: credits.data,
      recs: recs.data,
      providers: providers.data
    }

    res.status(200).send(movieinfo)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
