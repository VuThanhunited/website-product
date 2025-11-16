const axios = require("axios");

// Test tạo đơn hàng và gửi email
async function testOrder() {
  try {
    console.log("🧪 Testing order creation with email...\n");

    const testOrderData = {
      customerInfo: {
        fullName: "Nguyễn Văn Test",
        email: "vtu21102000@gmail.com", // Email thật để nhận test
        phone: "0123456789",
        address: "123 Đường Test",
        city: "Hà Nội",
        district: "Cầu Giấy",
        ward: "Dịch Vọng",
        notes: "Đơn hàng test - vui lòng bỏ qua",
      },
      items: [
        {
          productId: "507f1f77bcf86cd799439011",
          productName: "Dầu nhớt cao cấp Mobil 1",
          quantity: 2,
          price: 450000,
        },
        {
          productId: "507f1f77bcf86cd799439012",
          productName: "Phụ gia động cơ Premium",
          quantity: 1,
          price: 250000,
        },
      ],
      subtotal: 1150000,
      shippingFee: 30000,
      total: 1180000,
      paymentMethod: "cod",
      status: "pending",
      language: "vi",
    };

    console.log("📦 Creating test order...");
    const response = await axios.post(
      "http://localhost:5000/api/orders",
      testOrderData
    );

    if (response.data.success) {
      console.log("\n✅ Order created successfully!");
      console.log("📧 Order ID:", response.data._id);
      console.log("👤 Customer:", testOrderData.customerInfo.fullName);
      console.log("📧 Email:", testOrderData.customerInfo.email);
      console.log("💰 Total:", testOrderData.total.toLocaleString() + "đ");
      console.log("\n⏳ Waiting for emails to be sent (check your inbox)...");
      console.log("📬 Check email: " + testOrderData.customerInfo.email);
      console.log("📬 Check admin email: vtu21102000@gmail.com");
      console.log("\n✨ Test completed successfully!");
      console.log(
        "💡 Tip: Check spam folder if you don't see the email in inbox"
      );
    } else {
      console.log("\n❌ Order creation failed:");
      console.log(response.data);
    }
  } catch (error) {
    console.error("\n❌ Test failed:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    console.log(
      "\n💡 Make sure backend server is running on http://localhost:5000"
    );
  }
}

testOrder();
