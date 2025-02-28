const jwt = require("jsonwebtoken");
const fs = require("fs");

const accessTokenExpiry = process.env.JWT_ACCESS_TOKEN_EXPIRY;

const publicKey = fs.readFileSync("certificates/public.pem", "utf8");
const privateKey = fs.readFileSync("certificates/private.pem", "utf8");

const signAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, privateKey, {
    algorithm: "RS256",
    expiresIn: accessTokenExpiry,
  });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, publicKey);
  } catch (err) {
    return null;
  }
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
