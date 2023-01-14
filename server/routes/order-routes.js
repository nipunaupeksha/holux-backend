const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");

router.post("/create-order", orderController.createOrder);
router.post("/get-daily-orders", orderController.getDailyOrders);
router.post("/get-outlet-orders", orderController.getOutletOrders);
router.post("/get-outlet-daily-orders", orderController.getOutletDailyOrders);

module.exports = router;