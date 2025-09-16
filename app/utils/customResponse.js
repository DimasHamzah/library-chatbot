/**
 * @class CustomResponse
 * @description A utility class for sending standardized API responses.
 */
class CustomResponse {

  /**
   * Sends a standardized success response.
   * @param {object} res - The Express response object.
   * @param {*} [data=null] - The payload to send in the response.
   * @param {string} [message='Success'] - The response message.
   * @param {number} [statusCode=200] - The HTTP status code.
   */
  success(res, data, message = 'Success', statusCode = 200) {
    res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  }

  /**
   * Sends a standardized error response.
   * @param {object} res - The Express response object.
   * @param {string} [message='An error occurred'] - The error message.
   * @param {number} [statusCode=500] - The HTTP status code.
   */
  error(res, message = 'An error occurred', statusCode = 500) {
    res.status(statusCode).json({
      status: 'error',
      message,
    });
  }

  /**
   * Sends a standardized 404 Not Found error response.
   * This is a convenience method that calls the error() method with a 404 status code.
   * @param {object} res - The Express response object.
   * @param {string} [message='Resource not found'] - The error message.
   */
  notFound(res, message = 'Resource not found') {
    this.error(res, message, 404);
  }
}

module.exports = new CustomResponse();
