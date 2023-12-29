const customerModel = require("../models/customerModel");

module.exports = {
    index: async (req, res, next) => {
        try {
            const customers = await customerModel.find({});
            res.json(customers);
        } catch (err) {
            return res.status(500).json({
                message: "Error while fetching Customers",
                error: err.message,
            });
        }
    },
    show: async (req, res, next) => {
        try {
            const customer = await customerModel.findById(req.params.id);
            res.json(customer);
        } catch (err) {
            return res.status(500).json({
                message: "Error while fetching Customers",
                error: err.message,
            });
        }
    },
};
