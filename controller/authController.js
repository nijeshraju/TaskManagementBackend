const bcrypt = require("bcryptjs");
const { signAccessToken } = require("../utils/jwt");
const User = require("../model/user");
const { sendError, sendSuccess } = require("../jsonResponse");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendError(res, "Invalid credentials", 403);
    }

    const accessToken = signAccessToken(user);

    sendSuccess(res, "Login successful", 200, {
      accessToken,
      userId: user.id,
    });
  } catch (error) {
    sendError(res, error?.message || "Login Failed", 500, error);
  }
};

module.exports = {
  login,
};
