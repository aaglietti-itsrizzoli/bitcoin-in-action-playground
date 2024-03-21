// https://github.com/bitcoinjs/regtest-client#usage
// bitcoinjs-lib must be the >=5.0.6 to use.
// For bitcoinjs-lib >=4.0.3, use version v0.0.8 of regtest-client
const bitcoin = require('bitcoinjs-lib')
const { RegtestUtils } = require('regtest-client')
const regtestUtils = new RegtestUtils({APIURL: 'http://bitcoinjs-regtest-server:8080/1'})
const sleep = ms => new Promise(r => setTimeout(r, ms))

const network = regtestUtils.network // regtest network params

const keyPair = bitcoin.ECPair.makeRandom({ network })
const p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network })

;(async () => {
    // a new address
    const address = p2pkh.address
    console.log('a new address', address)

    // Tell the server to send you coins (satoshis)
    // Can pass address
    const unspent = await regtestUtils.faucet(address, 2e4)
    console.log('unspent', {unspent})

    // Get all current unspents of the address.
    const unspents = await regtestUtils.unspents(p2pkh.address)
    console.log('unspents', {unspents})

    // Get data of a certain transaction
    const fetchedTx = await regtestUtils.fetch(unspent.txId)
    console.log('fetchedTx', {fetchedTx})

    const mineResult = await regtestUtils.mine(2)
    console.log("mine result", mineResult)

    const unspentComplex = await regtestUtils.faucetComplex(p2pkh.output, 1e4)

    await sleep(100);

    const txb = new bitcoin.TransactionBuilder(network)
    txb.addInput(unspent.txId, unspent.vout)
    txb.addInput(unspentComplex.txId, unspentComplex.vout)
    txb.addOutput(regtestUtils.RANDOM_ADDRESS, 1e4)

    txb.sign({
      prevOutScriptType: 'p2pkh',
      vin: 0,
      keyPair,
    })
    txb.sign({
      prevOutScriptType: 'p2pkh',
      vin: 1,
      keyPair,
    })
    const tx = txb.build()

    // build and broadcast to the Bitcoin RegTest network
    await regtestUtils.broadcast(tx.toHex())

    await regtestUtils.verify({
      txId: tx.getId(),
      address: regtestUtils.RANDOM_ADDRESS,
      vout: 0,
      value: 1e4
    })
})();