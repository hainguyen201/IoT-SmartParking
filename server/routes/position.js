const express = require('express');
const router = express.Router();

const positionController = require('../controllers/positionController');

router.get('/', positionController.getPositions);
router.get('/:positionId', positionController.getPositionsByID);
router.post('/', positionController.createPosition);
router.put('/:positionId', positionController.updatePositionStatus);
router.delete('/:positionId', positionController.deletePosition)
    // router.post('/', positionController.findAndUpdateOrPost);

module.exports = router;