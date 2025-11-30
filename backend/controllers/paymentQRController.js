const PaymentQR = require('../models/PaymentQR');

const getAllPaymentQRs = async (req, res) => {
  try {
    const paymentQRs = await PaymentQR.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(paymentQRs);
  } catch (error) {
    console.error('Error fetching payment QRs:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin QR thanh toán', error: error.message });
  }
};

const getActivePaymentQRs = async (req, res) => {
  try {
    const paymentQRs = await PaymentQR.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    res.json(paymentQRs);
  } catch (error) {
    console.error('Error fetching active payment QRs:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin QR thanh toán', error: error.message });
  }
};

const getPaymentQRById = async (req, res) => {
  try {
    const paymentQR = await PaymentQR.findById(req.params.id);
    if (!paymentQR) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin QR thanh toán' });
    }
    res.json(paymentQR);
  } catch (error) {
    console.error('Error fetching payment QR:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin QR thanh toán', error: error.message });
  }
};

const createPaymentQR = async (req, res) => {
  try {
    const { bankName, accountNumber, accountName, qrCodeImage, translations, isActive, displayOrder } = req.body;
    const newPaymentQR = new PaymentQR({
      bankName,
      accountNumber,
      accountName,
      qrCodeImage,
      translations,
      isActive,
      displayOrder,
    });
    const savedPaymentQR = await newPaymentQR.save();
    res.status(201).json(savedPaymentQR);
  } catch (error) {
    console.error('Error creating payment QR:', error);
    res.status(500).json({ message: 'Lỗi khi tạo QR thanh toán', error: error.message });
  }
};

const updatePaymentQR = async (req, res) => {
  try {
    const { bankName, accountNumber, accountName, qrCodeImage, translations, isActive, displayOrder } = req.body;
    const updatedPaymentQR = await PaymentQR.findByIdAndUpdate(
      req.params.id,
      { bankName, accountNumber, accountName, qrCodeImage, translations, isActive, displayOrder },
      { new: true, runValidators: true }
    );
    if (!updatedPaymentQR) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin QR thanh toán' });
    }
    res.json(updatedPaymentQR);
  } catch (error) {
    console.error('Error updating payment QR:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật QR thanh toán', error: error.message });
  }
};

const deletePaymentQR = async (req, res) => {
  try {
    const deletedPaymentQR = await PaymentQR.findByIdAndDelete(req.params.id);
    if (!deletedPaymentQR) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin QR thanh toán' });
    }
    res.json({ message: 'Xóa QR thanh toán thành công' });
  } catch (error) {
    console.error('Error deleting payment QR:', error);
    res.status(500).json({ message: 'Lỗi khi xóa QR thanh toán', error: error.message });
  }
};

const toggleActiveStatus = async (req, res) => {
  try {
    const paymentQR = await PaymentQR.findById(req.params.id);
    if (!paymentQR) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin QR thanh toán' });
    }
    paymentQR.isActive = !paymentQR.isActive;
    await paymentQR.save();
    res.json(paymentQR);
  } catch (error) {
    console.error('Error toggling active status:', error);
    res.status(500).json({ message: 'Lỗi khi thay đổi trạng thái', error: error.message });
  }
};

module.exports.getAllPaymentQRs = getAllPaymentQRs;
module.exports.getActivePaymentQRs = getActivePaymentQRs;
module.exports.getPaymentQRById = getPaymentQRById;
module.exports.createPaymentQR = createPaymentQR;
module.exports.updatePaymentQR = updatePaymentQR;
module.exports.deletePaymentQR = deletePaymentQR;
module.exports.toggleActiveStatus = toggleActiveStatus;
