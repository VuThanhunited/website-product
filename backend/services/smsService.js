const axios = require("axios");

/**
 * SMS Service using SMSAPI.vn (Vietnam SMS provider)
 * Alternative: You can use Twilio, Esms.vn, or other SMS providers
 */

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send SMS via SMSAPI.vn (you need to register and get API key)
const sendSMS = async (phoneNumber, message) => {
  try {
    // For development/testing, just log the SMS
    if (process.env.NODE_ENV !== "production" || !process.env.SMS_API_KEY) {
      console.log("=== SMS (Development Mode) ===");
      console.log("To:", phoneNumber);
      console.log("Message:", message);
      console.log("==============================");
      return { success: true, message: "SMS sent (dev mode)" };
    }

    // Production: Use actual SMS API
    // Example with SMSAPI.vn
    const response = await axios.post(
      "https://api.smsapi.vn/sendsms/json",
      {
        username: process.env.SMS_USERNAME,
        password: process.env.SMS_PASSWORD,
        from: process.env.SMS_SENDER_NAME || "EFT",
        to: phoneNumber,
        text: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.code === 0) {
      return { success: true, message: "SMS sent successfully" };
    } else {
      throw new Error(response.data.message || "Failed to send SMS");
    }
  } catch (error) {
    console.error("SMS sending error:", error);
    throw new Error("Không thể gửi tin nhắn SMS. Vui lòng thử lại.");
  }
};

// Send password reset code via SMS
const sendPasswordResetSMS = async (phoneNumber, code) => {
  const message = `Ma xac thuc dat lai mat khau cua ban la: ${code}. Ma co hieu luc trong 15 phut. Khong chia se ma nay voi bat ky ai.`;
  return await sendSMS(phoneNumber, message);
};

module.exports = {
  generateVerificationCode,
  sendSMS,
  sendPasswordResetSMS,
};
