const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    featuredVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos",
        unique: true,
      },
    ],
    resetToken: String,
    expireResetToken: Date,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Users", UserSchema);
