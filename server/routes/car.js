const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/getCars', carController.getCars);
router.get('/getCarByCarCode', carController.getCarByCarCode);
router.post('/createCar', carController.createCar);
router.post('/updateCar', carController.updateCar);
router.post('/findAndUpdateOrPost', carController.findAndUpdateOrPost);

module.exports = router;