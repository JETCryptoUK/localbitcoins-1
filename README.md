# LocalBitcoins API
## Contact Me
### Telegram: @PavelWolfDark or https://t.me/PavelWolfDark
## Donation
#### You can donate to the development of open source projects
#### BTC Address
### 15sjjAUtJdB1ncsxKK7KtyJPtF46UhXWo4
#### Thanks!:3
## Install
```sh
npm i --save @darkwolf/localbitcoins
```
## Usage
```javascript
const { LocalBitcoins } = require('@darkwolf/localbitcoins')

const btc = new LocalBitcoins(key, secret)

try {
  await btc.sendBtc(address, amount)
} catch (e) {
  switch (e.space) {
    case 'localbitcoins': {
      switch (e.code) {
        case 'insufficient-funds': {
          ...doSmth()
          break
        }
        default: throw e
      }
      break
    }
    default: throw e  
  }
}
```
## Methods
### getAccountInfo(username)
### sendBtc(address, amount)
### getWallet()
### getAddress()
### getBalance()
### getSendable()
### getOldAddresses()
### getReceivedTransactions()
### getSentTransactions()
## Types
### AccountInfo
### Wallet
### Transaction
### OldAddress
