
let Transaction = require('../models/Transaction')
async function getTransactions(req, res){
    try {
        let transactions = await Transaction.find({});
        console.log(transactions);
        res.status(200).send({ data : transactions })
    }catch(err) {
        console.log(err)
        res.status(500).send({ message : err })
    }

}

module.exports = {
    getTransactions
}