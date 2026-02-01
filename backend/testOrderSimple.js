const http = require("http");

const postData = JSON.stringify({
  customerInfo: {
    fullName: "Nguyen Van Test",
    email: "vtu21102000@gmail.com",
    phone: "0123456789",
    address: "123 Test Street",
    ward: "Phuong 1",
    district: "Quan 1",
    city: "Ha Noi",
    notes: "Test order for email verification",
  },
  items: [
    {
      productId: "test123",
      productName: "Test Product 1",
      quantity: 2,
      price: 500000,
      image: "https://via.placeholder.com/150",
    },
    {
      productId: "test456",
      productName: "Test Product 2",
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
});

const options = {
  hostname: "127.0.0.1",
  port: 5000,
  path: "/api/orders",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
};

console.log("Creating test order...\n");

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log("✅ Order created successfully!");
        console.log("📋 Order Number:", response.orderNumber);
        console.log("💰 Total:", response.total.toLocaleString(), "VND");
        console.log("\n📧 Email should be sent to: vtu21102000@gmail.com");
        console.log("   Subject: Xác nhận đơn hàng #... - EFT Technology");
        console.log("\n⏳ Please check your email (and spam folder)");
      } else {
        console.log("❌ Order creation failed:", response.message);
      }
    } catch (error) {
      console.error("❌ Error parsing response:", error.message);
      console.log("Raw response:", data);
    }
  });
});

req.on("error", (error) => {
  console.error("❌ Request error:", error.message);
});

req.write(postData);
req.end();
