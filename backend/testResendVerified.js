require("dotenv").config();
const { Resend } = require("resend");

// Test với email đã verify (vtu21102000@gmail.com)
const testResendWithVerifiedEmail = async () => {
  try {
    console.log("🧪 Testing Resend with Verified Email...\n");

    const resend = new Resend(process.env.RESEND_API_KEY);
    const verifiedEmail = "vtu21102000@gmail.com"; // Email đã verify

    console.log("📧 Sending test email to verified address...");
    console.log("   FROM: EFT Technology <onboarding@resend.dev>");
    console.log("   TO:", verifiedEmail);
    console.log("");

    const { data, error } = await resend.emails.send({
      from: "EFT Technology <onboarding@resend.dev>",
      to: [verifiedEmail],
      subject: "✅ Test Order Confirmation - EFT Technology",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: white;">EFT Technology</h1>
              <p style="margin: 10px 0 0 0; color: white;">Test Order Confirmation</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="color: #333;">✅ Resend Email Working!</h2>
              <p style="color: #555; line-height: 1.6;">
                Xin chào,<br><br>
                Email này xác nhận rằng hệ thống email Resend đang hoạt động đúng.
              </p>
              
              <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #667eea;">Thông tin test:</h3>
                <p style="margin: 5px 0; color: #555;">
                  <strong>Mã đơn hàng:</strong> #TEST12345<br>
                  <strong>Ngày:</strong> ${new Date().toLocaleString("vi-VN")}<br>
                  <strong>Tổng tiền:</strong> 100,000₫
                </p>
              </div>

              <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #2e7d32; font-weight: 600;">
                  ⚠️ Lưu ý: Hiện tại Resend đang ở TEST MODE
                </p>
                <p style="margin: 10px 0 0 0; color: #555; font-size: 14px;">
                  Email chỉ có thể gửi đến: ${verifiedEmail}<br>
                  Để gửi đến bất kỳ email nào, cần verify domain tại:<br>
                  <a href="https://resend.com/domains" style="color: #667eea;">resend.com/domains</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Failed to send email:", error);
      process.exit(1);
    }

    console.log("✅ Email sent successfully to verified address!");
    console.log("   Email ID:", data.id);
    console.log("");
    console.log("📬 Check your email:", verifiedEmail);
    console.log("");
    console.log("⚠️  IMPORTANT - RESEND TEST MODE LIMITATIONS:");
    console.log("   - Current: Can only send to", verifiedEmail);
    console.log("   - To send to ANY customer email:");
    console.log("     1. Visit: https://resend.com/domains");
    console.log("     2. Add and verify your domain (e.g., efttech.vn)");
    console.log("     3. Change FROM address to: orders@yourdomain.com");
    console.log("     4. Restart server");
    console.log("");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

console.log("=".repeat(60));
console.log("   RESEND TEST MODE - VERIFIED EMAIL ONLY");
console.log("=".repeat(60));
console.log("");

testResendWithVerifiedEmail();
