const customerModel = require("../models/CustomerModel");

const handleError = (res, action, err) => {
    return res.status(500).json({
        message: `Error while ${action} Customer`,
        error: err.message,
    });
};

const responseNotFound = (res, resource) => {
    return res.status(404).json({
        message: `${resource} not found`,
    });
};

module.exports = {
    index: async (_req, res) => {
        try {
            const customers = await customerModel.find({});
            return res.status(200).json(customers);
        } catch (err) {
            return handleError(res, "fetching", err);
        }
    },

    show: async (req, res) => {
        try {
            const customer = await customerModel.findById(req.params.id);

            if (!customer) {
                return responseNotFound(res, "Customer");
            }

            return res.status(200).json(customer);
        } catch (err) {
            return handleError(res, "fetching", err);
        }
    },

    create: async (_req, res) => {
        try {
            const newCustomer = new customerModel(res.body);

            const savedCustomer = await newCustomer.save();

            return res.status(201).json(savedCustomer);
        } catch (error) {
            return handleError(res, "creating", error);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedCustomer = await customerModel.findByIdAndDelete(
                req.params.id
            );

            if (!deletedCustomer) {
                return responseNotFound(res, "Customer");
            }

            return res.status(200).json(deletedCustomer);
        } catch (err) {
            return handleError(res, "deleting", err);
        }
    },

    update: async (req, res) => {
        try {
            const updatedCustomer = await customerModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!updatedCustomer) {
                return responseNotFound(res, "Customer");
            }

            return res.status(200).json(updatedCustomer);
        } catch (err) {
            return handleError(res, "updating", err);
        }
    },
};
