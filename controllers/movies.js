const express = require("express")
const router = express.Router()

const Movies = require("../models/movies")
const User = require("../models/user")
const isSignedIn = require("../middleware/is-signed-in")

router.get("/new", isSignedIn, async (req, res) => {
  res.render("movies/new.ejs")
  // res.send(`This route is working`)
})

router.post("/new", isSignedIn, async (req, res) => {
  await Movies.create(req.body)
  res.redirect("/")
})

router.get("/", async (req, res) => {
  try {
    const allMovies = await Movies.find({})
    //console.log("Movies from database:", allMovies)
    res.render("movies/index.ejs", { movies: allMovies })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

router.get("/requests", async (req, res) => {
  const allMovies = await Movies.find({})
  res.render("movies/request.ejs", { movies: allMovies })
})

router.get("/requests/:movieId", async (req, res) => {
  const foundMovie = await Movies.findById(req.params.movieId)
  res.render("movies/edit.ejs", { movies: foundMovie })
})

router.get("/:movieId", async (req, res) => {
  const foundMovie = await Movies.findById(req.params.movieId)

  res.render("movies/show.ejs", { movies: foundMovie })
})

router.get("/:movieId/edit", async (req, res) => {
  const foundMovie = await Movies.findById(req.params.movieId)
  res.render("movies/edit.ejs", { movies: foundMovie })
})

router.delete("/:movieId", async (req, res) => {
  await Movies.findByIdAndDelete(req.params.movieId)
  res.redirect("/")
})

router.put("/requests/:movieId", async (req, res) => {
  if (req.body.approved === "on") {
    req.body.approved = true
  } else {
    req.body.approved = false
  }
  await Movies.findByIdAndUpdate(req.params.movieId, req.body)
  res.redirect("/")
})

module.exports = router
