const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:userID', userController.getUsersByID);
router.post('/', userController.createUser);
router.put('/:userID', userController.updateUser);
router.delete('/:userID', userController.deleteUser)
router.post('/logins', userController.getUserByUserNameAndPassword);

module.exports = router;