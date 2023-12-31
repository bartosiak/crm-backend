const customerModel = require("../models/customerModel");

module.exports = {
    index: async (req, res, next) => {
        try {
            const customers = await customerModel.find({});
            return res.status(200).json(customers);
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

            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found",
                });
            }

            return res.status(200).json(customer);
        } catch (err) {
            return res.status(500).json({
                message: "Error while fetching Customer",
                error: err.message,
            });
        }
    },

    create: async (req, res, next) => {
        try {
            const newCustomer = new customerModel({
                name: req.body.name,
                address: {
                    street: req.body.address.street,
                    zipCode: req.body.address.zipCode,
                    city: req.body.address.city,
                },
                nip: req.body.nip,
            });

            const savedCustomer = await newCustomer.save();

            return res.status(201).json(savedCustomer);
        } catch (err) {
            return res.status(500).json({
                message: "Error while creating Customer",
                error: err.message,
            });
        }
    },

    delete: async (req, res, next) => {
        try {
            const deletedCustomer = await customerModel.findByIdAndDelete(
                req.params.id
            );

            if (!deletedCustomer) {
                return res.status(404).json({
                    message: "Customer not found",
                });
            }

            return res.status(200).json(deletedCustomer);
        } catch (err) {
            return res.status(500).json({
                message: "Error while deleting Customer",
                error: err.message,
            });
        }
    },
};
