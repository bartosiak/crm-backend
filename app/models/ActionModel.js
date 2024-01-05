const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    description: String,
    type: {
        type: String,
        enum: ["mail", "phone", "meeting"],
    },
    date: Date,
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
});

module.exports = mongoose.model("Action", ActionSchema);
