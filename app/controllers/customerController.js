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
    index: async (req, res, next) => {
        try {
            const customers = await customerModel.find({});
            return res.status(200).json(customers);
        } catch (err) {
            return handleError(res, "fetching", err);
        }
    },

    show: async (req, res, next) => {
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
        } catch (error) {
            return handleError(res, "creating", error);
        }
    },

    delete: async (req, res, next) => {
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

    update: async (req, res, next) => {
        try {
            const updatedCustomer = await customerModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!customer) {
                return responseNotFound(res, "Customer");
            }

            return res.status(200).json(updatedCustomer);
        } catch (err) {
            return handleError(res, "updating", err);
        }
    },
};
