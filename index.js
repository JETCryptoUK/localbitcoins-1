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
    const accountInfo = new types.AccountInfo()._deserialize(res.data)
    this.emit('getAccountInfo', accountInfo)
    return accountInfo
  }

  async getWallet() {
    const res = await this._request('/api/wallet/')
    const wallet = new types.Wallet()._deserialize(res.data)
    this.emit('getWallet', wallet)
    return wallet
  }

  async getAddress() {
    const {address} = await this.getWallet()
    this.emit('getAddress', address)
    return address
  }

  async getBalance() {
    const {balance} = await this.getWallet()
    this.emit('getBalance', balance)
    return balance
  }

  async getSendable() {
    const {sendable} = await this.getWallet()
    this.emit('getSendable', sendable)
    return sendable
  }

  async getOldAddresses() {
    const {oldAddresses} = await this.getWallet()
    this.emit('getOldAddresses', oldAddresses)
    return oldAddresses
  }

  async getReceivedTransactions() {
    const {receivedTransactions} = await this.getWallet()
    this.emit('getReceivedTransactions', receivedTransactions)
    return receivedTransactions
  }

  async getSentTransactions() {
    const {sentTransactions} = await this.getWallet()
    this.emit('getSentTransactions', sentTransactions)
    return sentTransactions
  }

  async sendBtc(...args) {
    const data = new hooks.SendBtc(...args)
    await this._request('/api/wallet-send/', data, 'POST')
    this.emit('sendBtc', data)
    return data
  }
}

module.exports = new LocalBitcoins()
