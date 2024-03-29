const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            res.send(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                res.send(err);
            }

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id }, "secretKey", { expiresIn: "1h" });
    return token;
};
module.exports = mongoose.model("User", UserSchema);
