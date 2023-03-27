const express = require('express')
const router = express.Router()
const outletController = require('../controllers/outlet-controller')

router.post('/add-outlet', outletController.createOutlet)
router.get('/get-outlets', outletController.getOutlets)

module.exports = router
