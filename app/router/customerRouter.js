const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/customers", customerController.index);

router.get("/customers/:id", customerController.show);

module.exports = router;
