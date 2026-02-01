const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("📧 Testing Email Configuration...\n");

console.log("Environment Variables:");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✓ Set (hidden)" : "✗ Not set"
);
console.log("EMAIL_TO:", process.env.EMAIL_TO);
console.log("\n");

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

async function testEmail() {
  try {
    console.log("1️⃣ Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!\n");

    console.log("2️⃣ Sending test email...");
    const info = await transporter.sendMail({
      from: {
        name: "EFT Technology",
        address: process.env.EMAIL_USER,
      },
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "Test Email - EFT Technology",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #667eea;">Email Configuration Test</h2>
          <p>This is a test email to verify email configuration is working correctly.</p>
          <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0;"><strong>✅ Success!</strong> If you receive this email, your email service is configured correctly.</p>
          </div>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log("📬 Message ID:", info.messageId);
    console.log("📧 Sent to:", process.env.EMAIL_TO || process.env.EMAIL_USER);
    console.log("\n✨ Email configuration is working correctly!");
  } catch (error) {
    console.error("❌ Email test failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);

    if (error.code === "EAUTH") {
      console.error("\n⚠️  Authentication failed. Please check:");
      console.error("1. EMAIL_USER is correct");
      console.error(
        "2. EMAIL_PASS is a valid App Password (not your Gmail password)"
      );
      console.error(
        "3. 2-factor authentication is enabled on your Gmail account"
      );
      console.error(
        "4. Generate App Password at: https://myaccount.google.com/apppasswords"
      );
    } else if (error.code === "ETIMEDOUT" || error.code === "ECONNECTION") {
      console.error("\n⚠️  Connection timeout. Please check:");
      console.error("1. Your internet connection");
      console.error("2. Firewall settings");
      console.error("3. Gmail SMTP is not blocked");
    }
  }
}

testEmail();
