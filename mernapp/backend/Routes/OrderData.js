const express = require('express');
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    try {
        let data = Array.isArray(req.body.order_data) ? [...req.body.order_data] : [];
        data.splice(0, 0, { Order_data: req.body.order_date });

        let eId = await Order.findOne({ email: req.body.email });
        console.log(eId);

        if (!eId) {
            // Create new order if no existing order found
            try {
                await Order.create({
                    email: req.body.email,
                    order_data: [data]
                });
                res.json({ success: true });
            } catch (error) {
                console.error("Error in creating order: ", error.message);
                res.status(500).send({ error: error.message });
            }
        } else {
            // Update existing order
            try {
                await Order.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
                res.json({ success: true });
            } catch (error) {
                console.error("Error in updating order: ", error.message);
                res.status(500).send("Server Error: " + error.message);
            }
        }
    } catch (error) {
        console.error("Server Error: ", error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let eId = req.body.email;
        let orderData = await Order.findOne({ email: eId });

        if (orderData) {
            res.json({ success: true, orderData });
        } else {
            res.json({ success: false, message: "No orders found" });
        }
    } catch (error) {
        console.error('Error fetching order data:', error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
