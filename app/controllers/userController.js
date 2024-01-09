const User = require("../models/UserModel");

module.exports = {
    create: async (req, res) => {
        const newUser = new User(req.body);
        try {
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
