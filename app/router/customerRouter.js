const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/customers", customerController.index);

router.get("/customer/:id", customerController.show);

router.post("/add-customer", customerController.create);

router.delete("/delete-customer/:id", customerController.delete);

module.exports = router;
