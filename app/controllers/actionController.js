const CustomerModel = require("../models/CustomerModel");
const ActionModel = require("../models/ActionModel");

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
    index: async (req, res) => {
        const query = req.query.customerId
            ? { customerId: req.query.customerId }
            : {};
        try {
            const actions = await ActionModel.find(query);
            return res.status(200).json(actions);
        } catch (err) {
            return handleError(res, "fetching", err);
        }
    },

    show: async (req, res) => {
        try {
            const action = await ActionModel.findById(req.params.id);
            if (!action) {
                return responseNotFound(res, "Action");
            }
            return res.status(200).json(action);
        } catch (err) {
            return handleError(res, "fetching", err);
        }
    },

    create: async (req, res) => {
        try {
            const newAction = new ActionModel(req.body);
            console.log(req.body);
            const savedAction = await newAction.save();

            await CustomerModel.updateOne(
                { _id: req.body.customerId },
                { $push: { actions: newAction._id } }
            );

            return res.status(201).json(savedAction);
        } catch (error) {
            return handleError(res, "creating", error);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedAction = await ActionModel.findByIdAndDelete(
                req.params.id
            );

            if (!deletedAction) {
                return responseNotFound(res, "Action");
            }

            await CustomerModel.updateOne(
                { _id: req.body.customerId },
                { $pull: { actions: req.params.id } }
            );

            return res.status(200).json(deletedAction);
        } catch (err) {
            return handleError(res, "deleting", err);
        }
    },

    update: async (req, res) => {
        try {
            const updatedAction = await ActionModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!updatedAction) {
                return responseNotFound(res, "Action");
            }

            return res.status(200).json(updatedAction);
        } catch (err) {
            return handleError(res, "updating", err);
        }
    },
};
