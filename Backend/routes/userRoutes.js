const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();  // Use the router to define routes
const dotenv = require('dotenv');

dotenv.config();

// Register route
router.post(
    '/register',
    [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Check if the username already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken' });
            }

            // Create a new user
            const newUser = new User({ username, password });

            // Save the user to the database (password will be hashed automatically)
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    }
);


// Login route with validation
router.post(
    '/login',
    [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required'),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '72h',
            });

            res.json({ message: 'Login successful', token ,user});
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
);

module.exports = router;
