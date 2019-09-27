class Transaction {
  _deserialize(data) {
    const {
      amount,
      description,
      tx_type,
      created_at,
      txid
    } = data

    this.amount = parseFloat(amount)
    this.description = description
    this.type = tx_type
    this.createdAt = new Date(created_at).getTime()
    this.id = txid

    return this
  }
}

module.exports = Transaction
