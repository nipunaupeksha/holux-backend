const express = require("express")
const router = express.Router()
const itemController = require("../controllers/item-controller")

router.post("/add-item", itemController.createItem);
router.get("/get-items", itemController.getAllItems);

module.exports = router;