const express = require('express')
const router = express.Router();
const PaymentController = require('../controllers/PaymentController')
router.get("/transactions", (req, res)=>{
    PaymentController.getTransactions(req, res)
})

module.exports = router 