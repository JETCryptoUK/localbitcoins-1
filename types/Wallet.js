const Transaction = require('./Transaction')
const OldAddress = require('./OldAddress')

class Wallet {
  _deserialize(data) {
    const {
      receiving_address,
      received_transactions_30d,
      old_address_list,
      sent_transactions_30d,
      message,
      total: {
        balance,
        sendable
      }
    } = data

    this.address = receiving_address
    this.balance = parseFloat(balance)
    this.sendable = parseFloat(sendable)
    this.oldAddresses = old_address_list.map(o => new OldAddress()._deserialize(o))
    this.receivedTransactions = received_transactions_30d.map(o => new Transaction()._deserialize(o))
    this.sentTransactions = sent_transactions_30d.map(o => new Transaction()._deserialize(o))

    return this
  }
}

module.exports = Wallet
