const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.getCars);
router.get('/:carCode', carController.getCarByCarCode);
router.post('/', carController.createCar);
router.put('/:carCode', carController.updateCar);
module.exports = router;