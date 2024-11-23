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
      return res.send(`Username is taken`)
    }
    if (req.body.password !== req.body.confirmPassword) {
      res.send(`password & confirm password doesn't match`)
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.send(`Thanks for signing up ${user.username}`)
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
      res.send(`Login failed, please try again.`)
    }
    const validPass = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPass) {
      res.send(`Login Failed, please try again.`)
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
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
