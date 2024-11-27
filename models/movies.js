const mongoose = require("mongoose")
const Reviews = require("./reviews")

const moviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Movies = mongoose.model("Movies", moviesSchema)

module.exports = Movies
