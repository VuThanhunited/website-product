require("dotenv").config();
const { Resend } = require("resend");

// Test Resend API directly
const testResendAPI = async () => {
  try {
    console.log("🧪 Testing Resend API Configuration...\n");

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found in .env file!");
      process.exit(1);
    }

    console.log("✅ RESEND_API_KEY found");
    console.log("   API Key:", process.env.RESEND_API_KEY.substring(0, 10) + "...");
    console.log("");

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("✅ Resend initialized successfully\n");

    // Test email data
    const testCustomerEmail = "customer.test@example.com";

    console.log("📧 Sending test email...");
    console.log("   FROM: EFT Technology <onboarding@resend.dev>");
    console.log("   TO:", testCustomerEmail);
    console.log("");

    const { data, error } = await resend.emails.send({
      from: "EFT Technology <onboarding@resend.dev>",
      to: [testCustomerEmail],
      subject: "Test Email - EFT Technology Order Confirmation",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: white;">EFT Technology</h1>
              <p style="margin: 10px 0 0 0; color: white;">Email Test Successful ✅</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="color: #333;">Resend Email Service Working!</h2>
              <p style="color: #555; line-height: 1.6;">
                This is a test email to confirm that Resend is configured correctly.
              </p>
              <p style="color: #555; line-height: 1.6;">
                <strong>Test Details:</strong><br>
                - API Key: ${process.env.RESEND_API_KEY.substring(0, 15)}...<br>
                - Recipient: ${testCustomerEmail}<br>
                - Date: ${new Date().toLocaleString()}<br>
              </p>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #667eea; font-weight: 600;">
                  ✅ Email can now be sent to any customer email address!
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Failed to send email:");
      console.error("   Error:", error);
      console.error("");
      console.error("💡 Possible issues:");
      console.error("   - Invalid API key");
      console.error("   - API key doesn't have send permission");
      console.error("   - Network/firewall issue");
      process.exit(1);
    }

    console.log("✅ Email sent successfully!");
    console.log("");
    console.log("📨 Email Details:");
    console.log("   Email ID:", data.id);
    console.log("   Status: Sent");
    console.log("");
    console.log("🎉 SUCCESS! Resend is working correctly!");
    console.log("");
    console.log("📋 Next Steps:");
    console.log("   1. Restart your backend server");
    console.log("   2. Create a test order with a real email");
    console.log("   3. Check the email inbox (and spam folder)");
    console.log("");
    console.log("⚠️  Note: In Resend test mode, emails may only be sent to verified addresses.");
    console.log("    To send to any email, verify your domain at: https://resend.com/domains");
  } catch (error) {
    console.error("❌ Test failed with error:");
    console.error("   Error:", error.message);
    console.error("");

    if (error.message.includes("Invalid API key")) {
      console.error("💡 The API key appears to be invalid.");
      console.error("   Please check: https://resend.com/api-keys");
    }

    process.exit(1);
  }
};

// Run test
console.log("=".repeat(50));
console.log("        RESEND API CONFIGURATION TEST");
console.log("=".repeat(50));
console.log("");

testResendAPI();
