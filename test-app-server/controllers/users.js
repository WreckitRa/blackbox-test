const User = require("../models/User");

const fs = require("fs");
const path = require("path");
const { isEmpty } = require("lodash");

//* Update User by id
exports.addFeature = async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.body.id },
      { $push: { featuredVideos: req.body.videoId } }
    );

    const status = 200;
    return res.status(status).json({
      updatedUser,
    });
  } catch (error) {
    const status = 500;
    const message = "Error Server!";
    return res.status(status).json({ message: message });
  }
};

exports.removeFeature = async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.body.id },
      { $pull: { featuredVideos: req.body.videoId } }
    );

    const status = 200;
    return res.status(status).json({
      updatedUser,
    });
  } catch (error) {
    const status = 500;
    const message = "Error Server!";
    return res.status(status).json({ message: message });
  }
};

//* Get featured videos from user
exports.getFeature = async (req, res) => {
  try {
    videos = await User.findById(req.params.id)
      .populate({
        path: "featuredVideos",
        populate: { path: "userId", select: "fullName" },
      })
      .lean();
    return res.status(200).json({
      videos,
    });
  } catch (error) {
    console.log(error);
    const status = 500;
    const message = "Server Error";
    return res.status(status).json({
      message: message,
    });
  }
};
