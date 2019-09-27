class SendBtc {
  constructor(data) {
    if (data) {
      const {
        address,
        amount
      } = data

      this.address = address
      this.amount = parseFloat(parseFloat(amount).toFixed(8))
    }
  }
}

module.exports = SendBtc
