
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Transaction = require("../../models/Transaction");

async function makePayment(req, res) {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_TsQcL07XjaFhdQ",
            key_secret: "9guQ86IssTLQ7yv3rlIPnab2"
        });

        console.log(req.body);

        const amount = Number(req.body.amount);

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({
                message: "Invalid payment amount"
            });
        }

        const transaction = new Transaction(req.body);

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        transaction.transactionId = order.id;

        await transaction.save();

        console.log(order);

        return res.status(200).json(order);

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Unable to create payment order"
        });
    }
}

async function verifyPayment(req, res) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
            .createHmac("sha256", "9guQ86IssTLQ7yv3rlIPnab2")
            .update(sign)
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({
                message: "Invalid signature, payment failed!"
            });
        }

        const transaction = await Transaction.findOne({
            transactionId: razorpay_order_id
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        const razorpay = new Razorpay({
            key_id: "rzp_test_TsQcL07XjaFhdQ",
            key_secret: "9guQ86IssTLQ7yv3rlIPnab2"
        });

        const payment = await razorpay.payments.fetch(
            razorpay_payment_id
        );

        if (
            payment.order_id !== razorpay_order_id ||
            payment.status !== "captured"
        ) {
            return res.status(400).json({
                message: "Payment is not captured"
            });
        }

        transaction.status = "Completed";

        await transaction.save();

        return res.status(200).json({ message: "Payment verified successfully", data : razorpay_order_id});

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Payment verification failed"
        });
    }
}

async function getMyOrders(req, res){
    try{
        let { email } = req.body;
        console.log(email, 'email')
        let myorders = await Transaction.find({ email : email })
        console.log(myorders, 'myorders')
        res.status(200).send({ data : myorders })
    }catch(err){
        console.log(err)
        res.status(500).send({ message : 'Something went wrong'})
    }
}

module.exports = {
    makePayment,
    verifyPayment,
    getMyOrders
};
