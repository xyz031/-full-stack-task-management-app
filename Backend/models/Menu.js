const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu item name is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    availability: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Menu', menuSchema);
