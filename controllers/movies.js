const express = require("express")
const router = express.Router()

const Movies = require("../models/movies")
const isSignedIn = require("../middleware/is-signed-in")

router.get("/new", isSignedIn, async (req, res) => {
  res.render("movies/new.ejs")
  // res.send(`This route is working`)
})

router.post("/new", isSignedIn, async (req, res) => {
  await Movies.create(req.body)
  res.redirect("/movies")
})

router.get("/", async (req, res) => {
  try {
    const allMovies = await Movies.find()
    //console.log("Movies from database:", allMovies)
    res.render("movies/index.ejs", { movies: allMovies })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

router.get("/:movieId", async (req, res) => {
  const foundMovie = await Movies.findById(req.params.movieId)
  res.render("movies/show.ejs", { movies: foundMovie })
})

module.exports = router
