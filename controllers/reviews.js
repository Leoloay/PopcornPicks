const express = require("express")
const Reviews = require("../models/reviews")
const Movies = require("../models/movies")
const router = express.Router()

router.get("/", async (req, res) => {
  const foundReview = await Reviews.findById(req.session.user._id)
  const allReviews = await Reviews.find(req.params.movieId)
  res.render("movies/show.ejs", { review: foundReview, reviews: allReviews })
})

router.get("/new/:movieId", async (req, res) => {
  const foundReview = await Reviews.findOne({
    owner: req.session.user._id,
    movie: req.params.movieId,
  }).populate("owner")
  if (foundReview) {
    return res.send(`You already have a review`)
  }
  const foundMovie = await Movies.findById(req.params.movieId)

  res.render("reviews/new.ejs", {
    movies: foundMovie,
  })
})

router.post("/new", async (req, res) => {
  req.body.owner = req.session.user._id
  console.log(req.body.owner)
  req.body.movie = req.body.movieId
  console.log(req.body.movie)
  await Reviews.create(req.body)
  res.redirect("/")
})

router.get("/:reviewId", async (req, res) => {
  const foundReview = await Reviews.find({ _id: req.params.reviewId }).populate(
    "movie"
  )
  console.log(foundReview)
  res.render("reviews/show.ejs", { review: foundReview })
})

router.get("/:reviewId/edit", async (req, res) => {
  const foundReview = await Reviews.find({ _id: req.params.reviewId })
  res.render("reviews/edit.ejs", { foundReview })
})

module.exports = router
