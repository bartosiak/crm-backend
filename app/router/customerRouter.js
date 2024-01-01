const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/customers", customerController.index);

router.post("/customers", customerController.create);

router.get("/customers/:id", customerController.show);

router.put("/customers/:id", customerController.update);

router.delete("/customers/:id", customerController.delete);

module.exports = router;
