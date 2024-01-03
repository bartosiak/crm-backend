const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: {
            street: String,
            zipCode: String,
            city: String,
        },
        required: true,
    },
    nip: String,
    actions: {
        type: [
            {
                description: String,
                type: {
                    type: String,
                    enum: ["mail", "phone", "meeting"],
                },
                date: Date,
            },
        ],
        default: [],
    },
});

module.exports = mongoose.model("Customer", CustomerSchema);
