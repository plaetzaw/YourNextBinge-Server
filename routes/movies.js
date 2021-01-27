require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const API_KEY = process.env.API_KEY


router.use(bodyParser.urlencoded({ extended: false }));

router.post("/popularMovies", async (req, res) => {
    let page = req.body.page
    console.log(page)
    let popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`

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
    let fullInfoURL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    let creditsURL = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
    let recsURL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US`
    let providersURL = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY}&language=en-US`


    try {
        let info = await axios.get(fullInfoURL);
        if (info.data.budget === 0){
            info.data.budget = "No Budget Listed"
        }
        if (info.data.revenue === 0){
            info.data.revenue = "No Revenue Listed"
        }
        let credits = await axios.get(creditsURL);
        let recs = await axios.get(recsURL);
        let providers = await axios.get(providersURL)
        let movieinfo = {
            info: info.data,
            credits: credits.data,
            recs: recs.data,
            providers: providers.data,
        }

        res.status(200).send(movieinfo);
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e});
    }
})


module.exports = router;
