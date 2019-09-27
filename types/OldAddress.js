class OldAddress {
  _deserialize(data) {
    const {
      received,
      address
    } = data

    this.received = parseFloat(received)
    this.address = address

    return this
  }
}

module.exports = OldAddress
