class CustomResponse {
  success(res, data, message = 'Success', statusCode = 200) {
    res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  }

  error(res, message = 'An error occurred', statusCode = 500) {
    res.status(statusCode).json({
      status: 'error',
      message,
    });
  }

  notFound(res, message = 'Resource not found') {
    this.error(res, message, 404);
  }
}

module.exports = new CustomResponse();
