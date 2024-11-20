const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isItAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", UserSchema)

module.exports = User
