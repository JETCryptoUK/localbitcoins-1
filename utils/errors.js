const CodeError = require('@darkwolf/code-error')

class LocalBitcoinsError extends CodeError {
  constructor(code, message) {
    super({
      namespace: 'localbitcoins',
      code,
      message
    })
  }
}

const INSUFFICIENT_FUNDS = new LocalBitcoinsError('insufficient-funds', 'Insufficient funds')
const UNKNOWN_ERROR = new LocalBitcoinsError('unknown-error', 'Unknown error')

module.exports = {
  INSUFFICIENT_FUNDS,
  UNKNOWN_ERROR
}
