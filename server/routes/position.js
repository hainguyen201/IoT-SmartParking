const express = require('express');
const router = express.Router();

const positionController = require('../controllers/positionController');
// base+/posisions+...
router.get('/', positionController.getPositions);
router.get('/:positionId', positionController.getPositionsByID);
router.post('/', positionController.createPosition);
router.put('/:positionId', positionController.updatePositionStatus);
router.delete('/:positionId', positionController.deletePosition)
module.exports = router;