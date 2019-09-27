const CodeError = require('@darkwolf/code-error')

class LocalBitcoinsError extends CodeError {
  constructor(...args) {
    super('localbitcoins', ...args)
  }
}

const INSUFFICIENT_FUNDS = new LocalBitcoinsError('insufficient-funds', 'Insufficient funds')

const UNKNOWN_ERROR = new LocalBitcoinsError('unknown-error', 'Unknown error')

module.exports = {
  INSUFFICIENT_FUNDS,
  UNKNOWN_ERROR
}
