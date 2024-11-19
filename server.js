const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

//Import Controller
const authController = require("./controllers/auth")

//Invoke Controller
app.use("/auth", authController)

// Landing Page
app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.listen(3005, () => {
  console.log(`This app is listening on port 3005`)
})
