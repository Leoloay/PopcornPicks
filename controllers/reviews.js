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
  req.body.movie = req.body.movieId
  await Reviews.create(req.body)
  res.redirect("/")
})

router.get("/:reviewId", async (req, res) => {
  const foundReview = await Reviews.find({ _id: req.params.reviewId }).populate(
    "movie"
  )
  res.render("reviews/show.ejs", { review: foundReview })
})

router.get("/:reviewId/edit", async (req, res) => {
  const foundReview = await Reviews.find({ _id: req.params.reviewId }).populate(
    "movie",
    "owner"
  )
  res.render("reviews/edit.ejs", { review: foundReview })
})

router.put("/:reviewId", async (req, res) => {
  try {
    await Reviews.findByIdAndUpdate(req.params.reviewId, req.body).populate(
      "movie"
    )
    res.redirect("/")
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

router.delete("/:reviewId", async (req, res) => {
  await Reviews.findByIdAndDelete(req.params.reviewId)
  res.redirect("/")
})

module.exports = router
