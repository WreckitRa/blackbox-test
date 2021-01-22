const express = require("express");
const router = express.Router();
const { partial } = require("lodash");

const { verifyJwt } = require("../auth-jwt/verifyJwt");
const users = require("../controllers/users");

router.patch("/add", verifyJwt, users.addFeature);
router.get("/:id", verifyJwt, users.getFeature);
router.patch("/delete", verifyJwt, users.removeFeature);

module.exports = router;
