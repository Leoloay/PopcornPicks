const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

//Invoke

const User = require("../models/user")

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs")
})

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  try {
    if (userInDatabase) {
      return res.render("auth/usernameIsTaken.ejs")
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.render("auth/sign-up-failed.ejs")
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.redirect("/")
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.get("/sign-in", async (req, res) => {
  res.render("auth/sign-in.ejs")
})

router.post("/sign-in", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
      return res.render("auth/sign-in-failed.ejs")
    }
    const validPass = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPass) {
      return res.render("auth/sign-in-failed.ejs")
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      isItAdmin: userInDatabase.isItAdmin,
    }

    res.redirect("/")
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

router.get("/sign-out", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

module.exports = router
