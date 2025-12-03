const axios = require("axios");

// Test order với email khách hàng khác
const testOrder = async () => {
  const testData = {
    customerInfo: {
      fullName: "Nguyen Van Test",
      email: "customer.test@example.com", // Email test khác
      phone: "0987654321",
      address: "123 Test Street",
      city: "Ho Chi Minh",
    },
    items: [
      {
        productId: "test123",
        productName: "Test Product",
        quantity: 1,
        price: 100000,
      },
    ],
    subtotal: 100000,
    shippingFee: 30000,
    total: 130000,
    paymentMethod: "cod",
  };

  try {
    console.log("🧪 Testing order creation with customer email...");
    console.log("📧 Customer email:", testData.customerInfo.email);
    console.log("");

    const response = await axios.post("http://localhost:5000/api/orders", testData);

    console.log("✅ Order created successfully!");
    console.log("📦 Order ID:", response.data._id);
    console.log("📧 Email should be sent to:", testData.customerInfo.email);
    console.log("");
    console.log("⚠️  Please check server logs to confirm which email address received the message");
  } catch (error) {
    console.error("❌ Test failed:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

testOrder();
