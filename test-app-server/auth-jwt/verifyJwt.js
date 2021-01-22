const jwt = require("jsonwebtoken");

function verifyJwt(req, res, next) {
  const response = {};
  const token = req.headers["auth-token"];

  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
      statusText: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.statusCode = 401;
    response.statusText = "Unauthorized";
    res.json(response);
  }
}

module.exports = {
  verifyJwt,
};
