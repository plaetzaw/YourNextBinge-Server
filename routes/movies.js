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
    console.log(req.body)
    let movie_id = req.body.id
    console.log(movie_id)
    let fullInfoURL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    let creditsURL = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
    let recsURL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US`
    let providersURL = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY}&language=en-US`


    try {
        let movieinfo = []
        let info = await axios.get(fullInfoURL);
        let credits = await axios.get(creditsURL);
        let recs = await axios.get(recsURL);
        let providers = await axios.get(providersURL)
        let fullmovieinfo = movieinfo.concat(info.data, credits.data, recs.data, providers.data)
        res.status(200).send(fullmovieinfo);
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e});
    }
})


module.exports = router;
