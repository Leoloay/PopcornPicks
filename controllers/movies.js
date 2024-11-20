const express = require("express")
const router = express.Router()

const Movies = require("../models/movies")

router.get("/", (req, res) => {
  res.render("movies/index.ejs")
})

module.exports = router
