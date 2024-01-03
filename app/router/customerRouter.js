const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/", customerController.index);

router.post("/", customerController.create);

router.get("/:id", customerController.show);

router.put("/:id", customerController.update);

router.delete("/:id", customerController.delete);

module.exports = router;
