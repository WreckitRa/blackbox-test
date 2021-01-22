const Video = require("../models/Video");

const fs = require("fs");
const path = require("path");
const { isEmpty } = require("lodash");

//* Create a new Video
exports.createVideo = async (req, res) => {
  if (isEmpty(req.body)) {
    const status = 500;
    const message = "Content cannot be empty";
    return res.status(status).json({
      message: message,
    });
  }
  const video = new Video(req.body);
  try {
    const videoRes = await video.save();
    const status = 200;
    return res.status(status).json({
      videoRes,
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

//* Get all Video from the database
exports.getAllVideos = async (req, res) => {
  const role = req.query.role;
  const query = {};
  if (role) {
    query.role = role;
  }

  try {
    video = await Video.find(query)
      .populate({
        path: "userId",
        select: "fullName",
      })
      .lean();
    if (isEmpty(Video)) {
      const status = 400;
      const message = "No Video found";
      return res.status(status).json({
        error: message,
      });
    }

    return res.status(200).json({
      video,
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

//* Add video for video
exports.addVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const hostUrl = "http://localhost:8080";
    const locationPath = "/data/video/videos";
    const uploadLocation = path.join(__dirname, `../public${locationPath}`);
    const videoImageDir = `${uploadLocation}/${video._id}`;
    if (!fs.existsSync(videoImageDir)) {
      fs.mkdirSync(videoImageDir);
    }

    if (req.file) {
      video.videoPath = "";

      if (!fs.existsSync(`${videoImageDir}/${req.file.originalname}`)) {
        fs.writeFileSync(
          `${videoImageDir}/${req.file.originalname}`,
          Buffer.from(new Uint8Array(req.file.buffer))
        );
      }
      video.videoPath = video.videoPath.concat(
        `${hostUrl}/${locationPath}/${video._id}/${req.file.originalname}`
      );

      const resVideo = await video.save();
      const status = 200;
      return res.status(status).json({ resVideo });
    }
  } catch (error) {
    const status = 500;
    const message = "Server Error";
    return res.status(status).json({
      message: message,
    });
  }
};

//* Add thumbnail for video
exports.addThumbnail = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const hostUrl = "http://localhost:8080";
    const locationPath = "/data/image/videos";
    const uploadLocation = path.join(__dirname, `../public${locationPath}`);
    const videoImageDir = `${uploadLocation}/${video._id}`;
    if (!fs.existsSync(videoImageDir)) {
      fs.mkdirSync(videoImageDir);
    }

    if (req.file) {
      video.thumbnail = "";

      if (!fs.existsSync(`${videoImageDir}/${req.file.originalname}`)) {
        fs.writeFileSync(
          `${videoImageDir}/${req.file.originalname}`,
          Buffer.from(new Uint8Array(req.file.buffer))
        );
      }
      video.thumbnail = video.thumbnail.concat(
        `${hostUrl}/${locationPath}/${video._id}/${req.file.originalname}`
      );

      const resVideo = await video.save();
      const status = 200;
      return res.status(status).json({ resVideo });
    }
  } catch (error) {
    console.log(error);
    const status = 500;
    const message = "Server Error";
    return res.status(status).json({
      message: message,
    });
  }
};

exports.setVideoFeatured = async (req, res) => {
  try {
    const video = await Video.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );
    const status = 200;
    return res.status(status).json({
      video,
    });
  } catch (error) {
    const status = 500;
    const message = "Error Server!";
    return res.status(status).json({ message: message });
  }
};
