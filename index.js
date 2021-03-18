const dotenv = require('dotenv');
dotenv.config();

const Iota = require('@iota/core');
const Converter = require('@iota/converter');

const depth = 3;
const minimumWeightMagnitude = 9;
// CAUTION: The devnet requires a minimum weight magnitude of 9.

const seed = process.env.WALLET_SEED
const address = process.env.WALLET_ADDRESS;

const message = JSON.stringify({'message': 'Hello, Tangle!'});
const messageInTrytes = Converter.asciiToTrytes(message);

const transfers = [{
    value: 0.0,
    address: address,
    message: messageInTrytes
}];

const iota = Iota.composeAPI({
    provider: process.env.NODE_URL
});

console.log("Fetching node info...")
iota.getNodeInfo()
.then(info => console.log(JSON.stringify(info, null, 1)))
.catch(err => {
    console.error(err);
});

console.log("Preparing Tangle transfers...")
iota.prepareTransfers(seed, transfers)
.then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
})
.then(bundle => {
    console.log(bundle[0].hash);
})
.catch(err => {
    console.error(err);
});
