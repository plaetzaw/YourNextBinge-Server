require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const API_KEY = process.env.API_KEY


router.use(bodyParser.urlencoded({ extended: false }));

router.post("/popularMovies", async (req, res) => {
    let popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

    try {
        let popular = await axios.get(popularURL);
        console.log("results sent to client!");  
        res.status(200).send(popular.data);
    }
    catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

router.post("/fullmovieInfo", async (req, res) => {
    let movie_id = req.body.id
    console.log(movie_id)
    let fullURL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`

    try {
        let fullMovie = await axios.get(fullURL)
        res.status(200).send(fullMovie.data)
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

router.post("/fullmovieCredits", async (req, res) => {
    let movie_id = req.body.id
    console.log(movie_id)
    let fullURL = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`

    try {
        let fullMovie = await axios.get(fullURL)
        res.status(200).send(fullMovie.data)
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

router.post("/fullmovieRecommendations", async (req, res) => {
    let movie_id = req.body.id
    console.log(movie_id)
    let fullURL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US`

    try {
        let fullMovie = await axios.get(fullURL)
        res.status(200).send(fullMovie.data)
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

router.post("/fullmovieVideos", async (req, res) => {
    let movie_id = req.body.id
    console.log(movie_id)
    let fullURL = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`

    try {
        let fullMovie = await axios.get(fullURL)
        res.status(200).send(fullMovie.data)
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

router.post("/fullmovieWatchProviders", async (req, res) => {
    let movie_id = req.body.id
    console.log(movie_id)
    let fullURL = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY}&language=en-US`

    try {
        let fullMovie = await axios.get(fullURL)
        res.status(200).send(fullMovie.data)
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

module.exports = router;
