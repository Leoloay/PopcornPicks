const express = require("express")
const router = express.Router()

const Movies = require("../models/movies")
const isSignedIn = require("../middleware/is-signed-in")

router.get("/", async (req, res) => {
  res.render("movies/index.ejs")
})

router.get("/new", isSignedIn, async (req, res) => {
  res.render("movies/new.ejs")
  // res.send(`This route is working`)
})

router.post("/new", isSignedIn, async (req, res) => {
  await Movies.create(req.body)
  res.redirect("/movies")
})

module.exports = router
