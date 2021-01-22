const express = require("express");
const router = express.Router();
const { partial } = require("lodash");

const { verifyJwt } = require("../auth-jwt/verifyJwt");
const auths = require("../controllers/auth");
const { userRegisterValidator, userLoginValidator } = require("../validator");

router.post("/register", userRegisterValidator, partial(auths.registerUser));
router.get("/verify-account/:id", auths.verifyUser);
router.post("/login", userLoginValidator, partial(auths.loginUser));
router.post("/logout", partial(auths.logoutUser));
router.post("/reset-password", auths.resetPassword);
router.post("/change-password/:token", auths.changePassword);
module.exports = router;
