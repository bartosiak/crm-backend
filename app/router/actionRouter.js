const express = require("express");
const router = express.Router();
const actionController = require("../controllers/actionController");

router.get("/", actionController.index);

router.post("/", actionController.create);

router.get("/:id", actionController.show);

router.put("/:id", actionController.update);

router.delete("/:id", actionController.delete);

module.exports = router;
