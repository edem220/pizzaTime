const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });

        // Save user
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login existing user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        // Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
