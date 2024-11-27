const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
  },
  {
    timestamps: true,
  }
)

const Reviews = mongoose.model("Reviews", ReviewSchema)

module.exports = Reviews
