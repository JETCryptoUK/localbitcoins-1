const errors = require('./errors')

function errorHandler(code, message) {
  switch (code) {
    case 19: throw errors.INSUFFICIENT_FUNDS
    default: {
      const error = errors.UNKNOWN_ERROR
      error.message = message
      throw error
    }
  }
}

module.exports = errorHandler
