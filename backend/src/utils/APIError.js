const APIResponse = require('../utils/APIResponse');

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error('ERROR:', {
    message: err.message,
    statusCode,
    stack: err.stack,
    route: `${req.method} ${req.originalUrl}`,
    body: req.body
  });

  const response = new APIResponse(
    statusCode,
    null,
    err.message || 'Internal Server Error'
  );
  return res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
