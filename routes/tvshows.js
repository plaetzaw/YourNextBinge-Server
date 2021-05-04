require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const API_KEY = process.env.API_KEY

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/popularShows', async (req, res) => {
  const page = req.body.page || 1
  console.log(page)
  const API_KEY = process.env.API_KEY
  const popularURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`

  try {
    const popular = await axios.get(popularURL)
    res.status(200).send(popular.data)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

router.post('/fullshowInfo', async (req, res) => {
  const tvID = req.body.id
  const infoURL = `https://api.themoviedb.org/3/tv/${tvID}?api_key=${API_KEY}&language=en-US`
  const creditsURL = `https://api.themoviedb.org/3/tv/${tvID}/credits?api_key=${API_KEY}&language=en-US`
  const recsURL = `https://api.themoviedb.org/3/tv/${tvID}/recommendations?api_key=${API_KEY}&language=en-US`

  try {
    const info = await axios.get(infoURL)
    const credits = await axios.get(creditsURL)
    const recs = await axios.get(recsURL)
    const showinfo = {
      info: info.data,
      credits: credits.data,
      recs: recs.data
    }

    res.status(200).send(showinfo)
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

module.exports = router
