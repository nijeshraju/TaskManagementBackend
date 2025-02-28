const sendError = (res, message, statusCode, error) => {
  res.status(statusCode).json({ message, error });
};

const sendSuccess = (res, message, statusCode, data) => {
  res.status(statusCode).json({ message, data });
};

module.exports = {
  sendError,
  sendSuccess,
};
