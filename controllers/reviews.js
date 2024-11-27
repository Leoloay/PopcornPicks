const express = require("express")
const Reviews = require("../models/reviews")
const Movies = require("../models/movies")
const router = express.Router()

router.get("/", async (req, res) => {
  res.render("movies/show.ejs")
})

router.get("/new/:movieId", async (req, res) => {
  const foundMovie = await Movies.findById(req.params.movieId)
  console.log(foundMovie)
  res.render("reviews/new.ejs", { movies: foundMovie })
})

router.post("/new", async (req, res) => {
  req.body.owner = req.session.user._id
  console.log(req.body.owner)
  req.body.movie = req.body.movieId
  console.log(req.body.movie)
  await Reviews.create(req.body)
  res.redirect("/")
})

router.get("/:reviewId", async (req, res) => {})

module.exports = router
