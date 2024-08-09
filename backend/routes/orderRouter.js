import express from 'express';
import { isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler( async (req, res) => {
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemPrice: req.body.itemPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).send({ message: 'New order created', data: createdOrder })
 })
)

export default orderRouter;