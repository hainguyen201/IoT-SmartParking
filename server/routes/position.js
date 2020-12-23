const express = require('express');
const router = express.Router();

const positionController = require('../controllers/positionController');

router.get('/getPositions', positionController.getPositions);
router.get('/getPositionsByID', positionController.getPositionsByID);
router.post('/createPosition', positionController.createPosition);
router.post('/updatePosition', positionController.updatePosition);
router.post('/findAndUpdateOrPost', positionController.findAndUpdateOrPost);

module.exports = router;