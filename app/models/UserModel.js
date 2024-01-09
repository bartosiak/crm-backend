const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

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
module.exports = mongoose.model("User", UserSchema);
