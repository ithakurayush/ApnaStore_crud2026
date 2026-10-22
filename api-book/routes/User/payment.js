const express = require('express')
const PaymentController = require('../../controllers/User/PaymentController')
const router = express.Router();
router.post('/create-order',(req, res)=>{
    PaymentController.makePayment(req, res)
})

router.post('/verify-payment', (req,res)=>{
    PaymentController.verifyPayment(req.body)
})

module.exports = router