require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function testSendGrid() {
  console.log("🧪 Testing SendGrid email...\n");
  console.log("API Key:", process.env.SENDGRID_API_KEY ? "✅ Found" : "❌ Not found");
  console.log("From Email:", process.env.SENDGRID_FROM_EMAIL);
  console.log("To Email:", process.env.EMAIL_TO);
  console.log("---");

  const msg = {
    to: process.env.EMAIL_TO,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: "EFT Technology Test",
    },
    subject: "SendGrid Test Email - EFT Technology",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">✅ SendGrid Email Test</h2>
        <p>Chào bạn,</p>
        <p>Đây là email test từ hệ thống EFT Technology.</p>
        <p>Nếu bạn nhận được email này, nghĩa là SendGrid đã được cấu hình thành công!</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 14px;">
          <strong>Thông tin:</strong><br>
          Gửi lúc: ${new Date().toLocaleString("vi-VN")}<br>
          Service: SendGrid API
        </p>
      </div>
    `,
  };

  try {
    console.log("\n📤 Sending test email...");
    const response = await sgMail.send(msg);

    console.log("\n✅ Email sent successfully!");
    console.log("Status Code:", response[0].statusCode);
    console.log("Message ID:", response[0].headers["x-message-id"]);
    console.log("\n🎉 SendGrid is working correctly!");
  } catch (error) {
    console.error("\n❌ Error sending email:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Response body:", error.response.body);
    }
  }
}

testSendGrid();
