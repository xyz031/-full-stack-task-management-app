const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// GET /menu: Fetch all menu items
router.get('/', authMiddleware, async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
});

// POST /menu: Add a new menu item with validation
router.post('/',authMiddleware,async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const { name, category, price, availability } = req.body;
    console.log(name,category)
        const menuItem = new Menu({
            name,
            category,
            price,
            availability,
        });

        try {
            const newMenuItem = await menuItem.save();
            res.status(201).json(newMenuItem);
        } catch (error) {
            res.status(400).json({ message: 'Error adding menu item', error });
        }
    }
);

// PUT /menu/:id: Update a menu item with validation
router.put(
    '/:id',
    [
        body('name').trim().optional().notEmpty().withMessage('Name is required'),
        body('category').trim().optional().notEmpty().withMessage('Category is required'),
        body('price').optional().isNumeric().withMessage('Price must be a number'),
        body('availability').optional().isBoolean().withMessage('Availability must be a boolean value'),
    ],
    authMiddleware,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
            res.json(updatedItem);
        } catch (error) {
            res.status(400).json({ message: 'Error updating menu item', error });
        }
    }
);

// DELETE /menu/:id: Delete a menu item
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedItem = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item', error });
    }
});

module.exports = router;
