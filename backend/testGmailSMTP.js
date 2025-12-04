require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function testGmailSMTP() {
  console.log("🧪 Testing Gmail SMTP...\n");
  console.log("From:", process.env.EMAIL_USER);
  console.log("To:", process.env.EMAIL_TO);
  console.log("---\n");

  // Test 1: Gửi email cho admin
  const mailOptions = {
    from: {
      name: "EFT Technology",
      address: process.env.EMAIL_USER,
    },
    to: process.env.EMAIL_TO,
    subject: "Test Gmail SMTP - Admin Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">✅ Gmail SMTP Test - Admin</h2>
        <p>Email này gửi đến admin (${process.env.EMAIL_TO})</p>
        <p>Thời gian: ${new Date().toLocaleString("vi-VN")}</p>
      </div>
    `,
  };

  try {
    console.log("📤 Sending to admin...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email to admin sent!");
    console.log("   Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // Test 2: Gửi email cho khách hàng giả định
  const customerEmail = "customer.test@example.com"; // Thay bằng email thật để test
  const mailToCustomer = {
    from: {
      name: "EFT Technology",
      address: process.env.EMAIL_USER,
    },
    to: customerEmail,
    subject: "Xác nhận đơn hàng - EFT Technology",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">Xác Nhận Đơn Hàng</h2>
        <p>Xin chào Khách Hàng Test,</p>
        <p>Cảm ơn bạn đã đặt hàng tại EFT Technology!</p>
        <p><strong>Mã đơn hàng:</strong> TEST12345</p>
        <p><strong>Tổng tiền:</strong> 1,000,000đ</p>
        <hr>
        <p style="color: #666; font-size: 14px;">
          Đây là email test. Email thật sẽ được gửi khi khách hàng đặt hàng.
        </p>
      </div>
    `,
  };

  console.log(`\n📤 Testing customer email (to: ${customerEmail})...`);
  console.log("   (Change customerEmail in testGmailSMTP.js to test with real email)");
}

testGmailSMTP();
