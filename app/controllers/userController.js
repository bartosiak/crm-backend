const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

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
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        try {
            bcrypt.compare(req.body.password, user.password, (err, logged) => {
                if (err) {
                    res.status(400).json({
                        error: true,
                        message: "Login error",
                    });
                    return;
                }

                if (logged) {
                    const token = user.generateAuthToken(user);
                    res.status(200).json({ user: user, jwt: token });
                } else {
                    res.status(400).json({
                        error: true,
                        message: "Login data do not match",
                    });
                    return;
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
