const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ limits: { fieldSize: 2 * 1024 * 1024 } });
const { partial } = require("lodash");

const { verifyJwt } = require("../auth-jwt/verifyJwt");
const videos = require("../controllers/videos");

router.post("/", videos.createVideo);
router.post("/video/:id", upload.single("videoFiles"), videos.addVideo);
router.post("/image/:id", upload.single("imageFiles"), videos.addThumbnail);
router.get("/", videos.getAllVideos);
router.patch("/:id", videos.setVideoFeatured);

module.exports = router;
