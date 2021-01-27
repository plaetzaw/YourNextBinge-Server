require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const API_KEY = process.env.API_KEY
router.use(bodyParser.urlencoded({ extended: false }));



router.post("/search", async (req, res) => {
    console.log(req.body)
    const category = req.body.category
    const query = req.body.term
    const URL = `https://api.themoviedb.org/3/search/${category}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
        try {
        let searchResult = await axios.get(URL)
        console.log("Search results sent to client");
        res.status(200).send(searchResult.data)
        console.log(searchResult.data)
        }
        catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
        }
})

module.exports = router;
