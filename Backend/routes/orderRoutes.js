const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const authMiddleware = require('../middleware/authMiddleware');

// POST /order: Place an order
router.post('/',authMiddleware, async (req, res) => {
    const { userId, items } = req.body;

    try {
        // Calculate total amount
        let totalAmount = 0;
        for (let item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ message: `Menu item not found: ${item.menuItemId}` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const newOrder = new Order({ userId, items, totalAmount });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
});

// GET /orders: Fetch all orders for a user
router.get('/:userId',authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate('items.menuItemId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

module.exports = router;
