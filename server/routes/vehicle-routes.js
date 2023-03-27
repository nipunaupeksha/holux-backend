const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicle-controller')

router.post('/add-vehicle', vehicleController.addVehicle)

module.exports = router
