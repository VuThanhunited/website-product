require("dotenv").config();
const { sendOrderConfirmationEmail } = require("./services/emailService");

// Mock order data để test
const mockOrder = {
  _id: "673a1234567890abcdef1234",
  customerInfo: {
    fullName: "Nguyễn Văn Test",
    email: "vtu21102000@gmail.com",
    phone: "0123456789",
    address: "123 Đường Test, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
  },
  items: [
    {
      productName: "Dung dịch làm bóng cao su và lốp xe Tyre Shine Spray 500ml",
      quantity: 2,
      price: 150000,
    },
    {
      productName: "Nước làm mát động cơ tím GW12 Kuiper 50% 1L",
      quantity: 1,
      price: 200000,
    },
  ],
  subtotal: 500000,
  shippingFee: 30000,
  total: 530000,
  paymentMethod: "cod",
  createdAt: new Date(),
};

async function testEmail() {
  console.log("📧 Testing Email Service...\n");
  console.log("Email User:", process.env.EMAIL_USER);
  console.log(
    "Email Pass:",
    process.env.EMAIL_PASS ? "***configured***" : "NOT SET"
  );
  console.log("\n🔄 Sending test email...\n");

  try {
    const result = await sendOrderConfirmationEmail(mockOrder, "vi");

    if (result.success) {
      console.log("\n✅ EMAIL SENT SUCCESSFULLY!");
      console.log("Message ID:", result.messageId);
      console.log("\n📬 Check inbox:", mockOrder.customerInfo.email);
    } else {
      console.log("\n❌ EMAIL FAILED");
      console.log("Error:", result.error);
    }
  } catch (error) {
    console.error("\n❌ EXCEPTION:", error.message);
    console.error("Stack:", error.stack);
  }
}

testEmail();
