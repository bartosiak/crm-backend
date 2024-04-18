const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const generateError = require("../helpers/generateErrorHelper");

module.exports = {
    create: async (req, res) => {
        const newUser = new User(req.body);

        try {
            const existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) {
                return res
                    .status(409)
                    .json(
                        generateError(
                            "User already exists with the provided email address"
                        )
                    );
            }

            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json(generateError(error.message));
        }
    },
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json(generateError("User not found"));
        }
        try {
            bcrypt.compare(req.body.password, user.password, (err, logged) => {
                if (err) {
                    res.status(400).json(generateError("Login error"));
                    return;
                }

                if (logged) {
                    const token = user.generateAuthToken(user);
                    res.cookie("token", token);
                    res.status(200).json({ user: user, jwt: token });
                } else {
                    res.status(400).json(
                        generateError("Login data do not match")
                    );
                    return;
                }
            });
        } catch (error) {
            res.status(500).json(generateError(error.message));
        }
    },
};
