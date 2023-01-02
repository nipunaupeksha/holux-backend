const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/forgetpassword", userController.forgetPassword);
router.post('/forgetpassword/token',userController.tokenValidation); 
router.post("/forgetpassword/changepassword", userController.changePassword);

module.exports = router;