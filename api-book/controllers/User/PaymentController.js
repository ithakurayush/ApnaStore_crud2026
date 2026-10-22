const Razorpay = require("razorpay")
const Transaction = require('../../models/Transaction')
async function makePayment(req,res){
    try{
        const razorpay = new Razorpay({
            key_id : rzp_test_TqS9tuWwg1iGSX,
            secret_key : foY0nCDVFPQj016dC2r34A5r
        })
        console.log(req.body)
        let transaction = new Transaction(req.body)
        const options = {
            amount : req.body.amount*100,
            currency : 'INR',
            receipt : req.body.firstName
        } 
        const order = await razorpay.orders.create(options)
        console.log(order)
        transaction.transactionId = order.id
        await transaction.save();
        res.status(200).json(order)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

async function verifyPayment(req,res){
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", 'foY0nCDVFPQj016dC2r34A5r')
            .update(sign.toString())
            .digest("hex");
        console.log(expectedSign, 'expectedSign')
        if (razorpay_signature === expectedSign) {
            // पेमेंट सफल हुआ! यहाँ आप डेटाबेस में स्टूडेंट की फीस "Paid" मार्क कर सकते हैं।
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature, payment failed!" });
        }
    }catch{
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    makePayment,
    verifyPayment
}