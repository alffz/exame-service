import ResponseError from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.messages,
    });
  } else {
    res
      .status(500)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export default errorMiddleware;
