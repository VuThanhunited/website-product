require("dotenv").config();
const nodemailer = require("nodemailer");

// Test Gmail SMTP với email thật
const testGmailSMTP = async () => {
  try {
    console.log("🧪 Testing Gmail SMTP Direct Connection...\n");

    // Check credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env");
      process.exit(1);
    }

    console.log("📧 Email Configuration:");
    console.log("   From:", process.env.EMAIL_USER);
    console.log("   Password:", "***" + process.env.EMAIL_PASS.slice(-4));
    console.log("");

    // Create transporter
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

    // Verify connection
    console.log("🔌 Verifying Gmail connection...");
    await transporter.verify();
    console.log("✅ Gmail SMTP connection successful!\n");

    // Test email to customer
    const testCustomerEmail = "tkakunited012@gmail.com"; // Email khách hàng thật

    console.log("📨 Sending test email to CUSTOMER...");
    console.log("   To:", testCustomerEmail);
    console.log("");

    const info = await transporter.sendMail({
      from: {
        name: "EFT Technology",
        address: process.env.EMAIL_USER,
      },
      to: testCustomerEmail,
      subject: "✅ Test Email - Xác Nhận Đơn Hàng EFT Technology",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: white;">EFT Technology</h1>
              <p style="margin: 10px 0 0 0; color: white;">Test Email - Xác Nhận Hệ Thống</p>
            </div>
            
            <div style="padding: 40px;">
              <h2 style="color: #333;">✅ Email System Working!</h2>
              <p style="color: #555; line-height: 1.6;">
                Đây là email test để xác nhận hệ thống email đang hoạt động.<br><br>
                Nếu bạn nhận được email này, có nghĩa là:
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <ul style="margin: 0; padding-left: 20px; color: #555;">
                  <li>✅ Gmail SMTP đang hoạt động</li>
                  <li>✅ Email có thể gửi đến địa chỉ của bạn</li>
                  <li>✅ Xác nhận đơn hàng sẽ được gửi tương tự</li>
                </ul>
              </div>

              <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #2e7d32; font-weight: 600;">
                  🎉 Hệ thống email sẵn sàng nhận đơn hàng!
                </p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="margin: 0; color: #999; font-size: 14px;">
                  <strong>Chi tiết test:</strong><br>
                  From: ${process.env.EMAIL_USER}<br>
                  To: ${testCustomerEmail}<br>
                  Time: ${new Date().toLocaleString("vi-VN")}<br>
                  Service: Gmail SMTP
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY!\n");
    console.log("📬 Email Details:");
    console.log("   Message ID:", info.messageId);
    console.log("   Response:", info.response);
    console.log("");
    console.log("🎯 ACTION REQUIRED:");
    console.log("   1. Check inbox:", testCustomerEmail);
    console.log("   2. Check SPAM folder if not in inbox");
    console.log("   3. If received, email system is working!");
    console.log("");
    console.log("⚠️  If email not received:");
    console.log("   - Check spam/junk folder");
    console.log("   - Email might be delayed (wait 2-5 minutes)");
    console.log("   - Check Gmail sent folder:", process.env.EMAIL_USER);
  } catch (error) {
    console.error("\n❌ TEST FAILED!\n");
    console.error("Error:", error.message);
    console.error("");

    if (error.code === "EAUTH") {
      console.error("🔒 AUTHENTICATION ERROR:");
      console.error("   - Gmail App Password might be incorrect");
      console.error("   - Check .env EMAIL_PASS value");
      console.error("   - Generate new App Password at:");
      console.error("     https://myaccount.google.com/apppasswords");
    } else if (error.code === "ETIMEDOUT" || error.code === "ECONNECTION") {
      console.error("🌐 CONNECTION ERROR:");
      console.error("   - Check internet connection");
      console.error("   - Firewall might be blocking port 587/465");
    } else {
      console.error("Full error:", error);
    }

    process.exit(1);
  }
};

console.log("=".repeat(60));
console.log("   GMAIL SMTP DIRECT TEST - CUSTOMER EMAIL");
console.log("=".repeat(60));
console.log("");

testGmailSMTP();
