const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth.middleware');

// Only admin can access these
router.get('/', auth.protect, auth.restrictTo('admin'), userController.getAllUsers);

router.put('/:userId/role', auth.protect, auth.restrictTo('admin'), userController.updateUserRole);

router.get('/me', auth.protect, userController.getCurrentUser);

router.delete('/:userId', auth.protect, auth.restrictTo('admin'), userController.deleteUser); 

module.exports = router;
