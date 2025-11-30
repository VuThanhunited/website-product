const express = require('express');
const router = express.Router();
const paymentQRController = require('../controllers/paymentQRController');
const { protect, authorize } = require('../middleware/auth');

// Public routes (for frontend checkout)
router.get('/active', paymentQRController.getActivePaymentQRs);

// Admin routes (protected)
router.get('/', protect, authorize('admin'), paymentQRController.getAllPaymentQRs);
router.get('/:id', protect, authorize('admin'), paymentQRController.getPaymentQRById);
router.post('/', protect, authorize('admin'), paymentQRController.createPaymentQR);
router.put('/:id', protect, authorize('admin'), paymentQRController.updatePaymentQR);
router.delete('/:id', protect, authorize('admin'), paymentQRController.deletePaymentQR);
router.patch('/:id/toggle-active', protect, authorize('admin'), paymentQRController.toggleActiveStatus);

module.exports = router;
