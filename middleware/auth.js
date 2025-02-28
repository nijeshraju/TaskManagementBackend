const { sendError } = require("../jsonResponse");
const { verifyAccessToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return sendError(res, "Authorization header missing", 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return sendError(res, "Access Denied. No token provided", 401);
  }

  try {
    const payload = verifyAccessToken(token);
    if (!payload) return sendError(res, "Invalid or expired token", 401);
    req.user = payload;
    next();
  } catch (error) {
    sendError(res, err.message || "Invalid or expired token", 401);
  }
};

module.exports = authMiddleware;
