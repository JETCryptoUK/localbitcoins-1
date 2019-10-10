const crypto = require('crypto')
const EventEmitter = require('events')
const fetch = require('node-fetch')
const types = require('./types')
const hooks = require('./hooks')
const { errorHandler, errors } = require('./utils')

class LocalBitcoins extends EventEmitter {
  constructor(key, secret) {
    super()

    this.key = key
    this.secret = secret

    this.URL = 'https://localbitcoins.com'

    this.types = types
    this.hooks = hooks

    this.LocalBitcoins = LocalBitcoins
  }

  async _request(endpoint, data, method = 'GET') {
    const nonce = Date.now()
    const params = new URLSearchParams(data)
    const message = `${nonce}${this.key}${endpoint}${params}`
    const signature = crypto.createHmac('sha256', this.secret).update(message).digest('hex').toUpperCase()
    const res = await fetch(`${this.URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(this.key && {
          'Apiauth-Key': this.key,
          'Apiauth-Nonce': nonce,
          'Apiauth-Signature': signature
        })
      },
      ...(method === 'POST' && {body: params})
    })
    const json = await res.json()
    const {error} = json
    if (error) {
      const {
        error_code: code,
        message
      } = error
      errorHandler(code, message)
    }
    res.data = json.data
    return res
  }

  async getAccountInfo(username) {
    const res = await this._request(`/api/account_info/${username}/`)
    return new types.AccountInfo()._deserialize(res.data)
  }

  async getWallet() {
    const res = await this._request('/api/wallet/')
    return new types.Wallet()._deserialize(res.data)
  }

  async getAddress() {
    const {address} = await this.getWallet()
    return address
  }

  async getBalance() {
    const {balance} = await this.getWallet()
    return balance
  }

  async getSendable() {
    const {sendable} = await this.getWallet()
    return sendable
  }

  async getOldAddresses() {
    const {oldAddresses} = await this.getWallet()
    return oldAddresses
  }

  async getReceivedTransactions() {
    const {receivedTransactions} = await this.getWallet()
    return receivedTransactions
  }

  async getSentTransactions() {
    const {sentTransactions} = await this.getWallet()
    return sentTransactions
  }

  async sendBtc(...args) {
    const data = new hooks.SendBtc(...args)
    await this._request('/api/wallet-send/', data, 'POST')
    return data
  }
}

module.exports = new LocalBitcoins()
