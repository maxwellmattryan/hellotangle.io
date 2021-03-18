const Iota = require('@iota/core');

const instance = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

instance.getNodeInfo()
.then(info => console.log(JSON.stringify(info, null, 1)))
.catch(err => {
    console.log(err);
});
