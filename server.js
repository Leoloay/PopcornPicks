const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

const passUserToView = require("./middleware/pass-user-to-view.js")
// Add our custom middleware right after the session middleware
app.use(passUserToView)

//Import Controller
const authController = require("./controllers/auth")
const moviesController = require("./controllers/movies")
const reviewsController = require("./controllers/reviews")
const isSignedIn = require("./middleware/is-signed-in.js")

//Invoke Controller
app.use("/auth", authController)
app.use("/movies", moviesController)
app.use("/movies/:movieId/reviews", reviewsController)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// Landing Page
app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.session.user })
})

app.listen(3005, () => {
  console.log(`This app is listening on port 3005`)
})
