const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.getCars);
router.get('/carouts/:carCode', carController.getCarOutByCarCode)
router.get('/:carCode', carController.getCarByCarCode);
/**
 * {
 *  CarCode: "29b-fdsk"
 * }
 */
router.post('/', carController.createCar);
/**
 * 
 */
router.put('/:id', carController.updateCar);

module.exports = router;