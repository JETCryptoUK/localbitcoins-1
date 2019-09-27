const types = require('./types')

class SendBtc extends types.SendBtc {
  constructor(address, amount) {
    super({address, amount})
  }
}

module.exports = {
  SendBtc
}
