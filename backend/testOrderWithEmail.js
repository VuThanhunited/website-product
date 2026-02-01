const axios = require("axios");
require("dotenv").config();

console.log("🧪 Testing Order Creation with Email...\n");

const testOrder = {
  customerInfo: {
    fullName: "Nguyễn Văn Test",
    email: "vtu21102000@gmail.com", // Email nhận test
    phone: "0123456789",
    address: "123 Đường Test",
    ward: "Phường Test",
    district: "Quận Test",
    city: "Hà Nội",
    notes: "Đây là đơn hàng test để kiểm tra gửi email",
  },
  items: [
    {
      productId: "test123",
      productName: "Sản phẩm test 1",
      quantity: 2,
      price: 500000,
      image: "https://via.placeholder.com/150",
    },
    {
      productId: "test456",
      productName: "Sản phẩm test 2",
      quantity: 1,
      price: 300000,
      image: "https://via.placeholder.com/150",
    },
  ],
  subtotal: 1300000,
  shippingFee: 30000,
  total: 1330000,
  paymentMethod: "cod",
  status: "pending",
  language: "vi",
};

async function testOrderCreation() {
  try {
    console.log("📦 Creating test order...");
    console.log("Customer email:", testOrder.customerInfo.email);
    console.log("\n");

    const response = await axios.post(
      "http://localhost:5000/api/orders",
      testOrder,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      console.log("✅ Order created successfully!");
      console.log("📋 Order Number:", response.data.orderNumber);
      console.log("💰 Total:", response.data.total.toLocaleString(), "đ");
      console.log(
        "\n📧 Email should be sent to:",
        testOrder.customerInfo.email
      );
      console.log("\n⏳ Please check your email inbox (and spam folder)");
      console.log("   Email from: EFT Technology");
      console.log("   Subject: Xác nhận đơn hàng #... - EFT Technology");
    } else {
      console.error("❌ Order creation failed:", response.data.message);
    }
  } catch (error) {
    console.error("❌ Test failed:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error(
        "No response from server. Is backend running on port 5000?"
      );
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Wait a bit for backend to be ready
setTimeout(() => {
  testOrderCreation();
}, 2000);
