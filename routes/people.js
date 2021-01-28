require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const API_KEY = process.env.API_KEY

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/popularPeople", async (req, res) => {
    let page = req.body.page || 1
    console.log(page)
    let popularURL = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`

    try {
        let popular = await axios.get(popularURL);
        res.status(200).send(popular.data)
    } catch (e){
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

router.post("/personInfo", async (req, res) => {
    let person_id = req.body.id
    console.log(person_id)
    let infoURL = `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}&language=en-US`
    let moviecreditsURL = `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`
    let tvcreditsURL = `https://api.themoviedb.org/3/person/${person_id}/tv_credits?api_key=${API_KEY}&language=en-US&`


    try {
        let info = await axios.get(infoURL)
        let moviecredits = await axios.get(moviecreditsURL)
        let tvcredits = await axios.get(tvcreditsURL)
        let personinfo = {
            info: info.data,
            moviecredits: moviecredits.data,
            tvcredits: tvcredits.data
        }
        res.status(200).send(personinfo)
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

module.exports = router;