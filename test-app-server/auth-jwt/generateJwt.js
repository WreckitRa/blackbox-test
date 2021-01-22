const jwt = require("jsonwebtoken");

async function generateJwt(payload) {
  const { JWT_SECRET } = process.env;
  const jwtData = payload;

  jwtData.expiry = new Date().getTime() + 3600 * 24;
  const jsonToken = jwt.sign(jwtData, JWT_SECRET);

  return jsonToken;
}

module.exports = {
  generateJwt,
};
