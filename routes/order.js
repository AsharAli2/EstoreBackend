const express = require('express');
const mongoose = require('mongoose');
const { OrderModel } = require('../models/OrderModel');

const orderRouter = express.Router();

orderRouter.post('/checkout', async (req, res) => {

    userName = req.body.userName;
    products = req.body.products;
    const data = await OrderModel.findOne({ userName })

    if (data) {
        const dataexist = await OrderModel.updateOne({ userName }, { $push: { products } })
        res.send({ message: "wow" })
    }
    else {
        const newdata = new OrderModel({ userName, products })
        const saveorder = await newdata.save()
        res.send({ Message: "succesfully" })
    }
})

orderRouter.get('/history/:userName', async (req, res) => {
    userName = req.params.userName

    const allhistory = await OrderModel.findOne({ userName })

    if (allhistory) {
        res.send({ history: allhistory })
    }
    else {

        res.send('No History')

    }
})
module.exports = orderRouter