const winston = require('winston');
const path = require('path');

/**
 * @const logger
 * @description A configured Winston logger instance for application-wide logging.
 *
 * @property {string} level - The default minimum log level to capture ('info').
 * @property {object} format - The format for log messages (JSON).
 * @property {object} defaultMeta - Default metadata to be included in every log entry.
 * @property {Array<object>} transports - The configured output destinations for logs.
 * - A file transport for error-level logs, saved to `logs/error.log`.
 * - A file transport for all logs (info level and above), saved to `logs/combined.log`.
 * - A console transport is added conditionally for non-production environments.
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(__dirname, 'logs', 'combined.log') }),
  ],
});

// If we're not in production then log to the `console` with the `simple` format.
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
