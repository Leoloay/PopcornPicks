const mongoose = require("mongoose")

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
  },
  {
    timestamps: true,
  }
)

const Movies = mongoose.model("Movies", moviesSchema)

module.exports = Movies
