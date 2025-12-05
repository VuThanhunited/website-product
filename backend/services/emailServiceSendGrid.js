const sgMail = require("@sendgrid/mail");

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("✅ SendGrid email service initialized");
} else {
  console.warn("⚠️  SENDGRID_API_KEY not found");
}

// Generate order email HTML
const generateOrderEmailHTML = (order, language = "vi") => {
  const isVietnamese = language === "vi";

  const paymentMethodText = {
    cod: isVietnamese ? "Thanh toán khi nhận hàng (COD)" : "Cash on Delivery",
    bank: isVietnamese ? "Chuyển khoản ngân hàng" : "Bank Transfer",
    bank_transfer: isVietnamese ? "Chuyển khoản ngân hàng" : "Bank Transfer",
  };

  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.productName}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${item.price.toLocaleString()}₫</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${(
        item.quantity * item.price
      ).toLocaleString()}₫</td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 28px;">EFT Technology</h1>
      <p style="margin: 10px 0 0 0; color: white; font-size: 16px;">${
        isVietnamese ? "Xác Nhận Đơn Hàng" : "Order Confirmation"
      }</p>
    </div>
    
    <div style="padding: 40px;">
      <p style="margin: 0 0 20px 0; font-size: 16px; color: #333;">${
        isVietnamese ? `Xin chào ${order.customerInfo.fullName},` : `Hello ${order.customerInfo.fullName},`
      }</p>
      <p style="margin: 0 0 30px 0; font-size: 16px; color: #333;">${
        isVietnamese ? "Cảm ơn bạn đã đặt hàng tại EFT Technology!" : "Thank you for your order at EFT Technology!"
      }</p>
      
      <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px;">
        <h2 style="margin: 0 0 15px 0; color: #667eea; font-size: 18px;">${
          isVietnamese ? "Thông tin đơn hàng:" : "Order Information:"
        }</h2>
        <p style="margin: 5px 0; color: #555;"><strong>${
          isVietnamese ? "Mã đơn hàng" : "Order Number"
        }:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
        <p style="margin: 5px 0; color: #555;"><strong>${isVietnamese ? "Ngày đặt" : "Order Date"}:</strong> ${new Date(
    order.createdAt
  ).toLocaleString(isVietnamese ? "vi-VN" : "en-US")}</p>
        <p style="margin: 5px 0; color: #555;"><strong>${
          isVietnamese ? "Phương thức thanh toán" : "Payment Method"
        }:</strong> ${paymentMethodText[order.paymentMethod] || order.paymentMethod}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">${
          isVietnamese ? "Địa chỉ giao hàng:" : "Shipping Address:"
        }</h3>
        <p style="margin: 5px 0; color: #555; line-height: 1.6;">
          ${order.customerInfo.fullName}<br>
          ${order.customerInfo.phone}<br>
          ${order.customerInfo.email}<br>
          ${order.customerInfo.address}, ${order.customerInfo.city}
        </p>
      </div>
      
      <h3 style="margin: 0 0 15px 0; color: #333;">${isVietnamese ? "Sản phẩm:" : "Products:"}</h3>
      <table style="width: 100%; border: 1px solid #eee; border-radius: 4px; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f8f9fa;">
            <th style="padding: 12px; text-align: left;">${isVietnamese ? "Sản phẩm" : "Product"}</th>
            <th style="padding: 12px; text-align: center;">${isVietnamese ? "SL" : "Qty"}</th>
            <th style="padding: 12px; text-align: right;">${isVietnamese ? "Đơn giá" : "Price"}</th>
            <th style="padding: 12px; text-align: right;">${isVietnamese ? "Tổng" : "Total"}</th>
          </tr>
        </thead>
        <tbody>${itemsHTML}</tbody>
      </table>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span>${isVietnamese ? "Tạm tính:" : "Subtotal:"}</span>
          <strong>${order.subtotal.toLocaleString()}₫</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span>${isVietnamese ? "Phí vận chuyển:" : "Shipping:"}</span>
          <strong>${order.shippingFee.toLocaleString()}₫</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 2px solid #667eea;">
          <span style="font-size: 18px; font-weight: bold; color: #667eea;">${
            isVietnamese ? "Tổng cộng:" : "Total:"
          }</span>
          <strong style="font-size: 18px; color: #667eea;">${order.total.toLocaleString()}₫</strong>
        </div>
      </div>
      
      <p style="margin: 30px 0 0 0; color: #333;">${isVietnamese ? "Trân trọng," : "Best regards,"}</p>
      <p style="margin: 5px 0; font-weight: 600; color: #667eea;">EFT Technology</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
      <p style="margin: 0; font-size: 12px; color: #999;">© 2025 EFT Technology. ${
        isVietnamese ? "Bản quyền thuộc về" : "All rights reserved"
      }.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (order, language = "vi") => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SendGrid not configured - SENDGRID_API_KEY missing");
    }

    console.log("📧 Sending order confirmation email via SendGrid...");
    console.log("   Order ID:", order._id);
    console.log("   Customer email:", order.customerInfo.email);

    const isVietnamese = language === "vi";
    const orderNumber = order._id.toString().slice(-8).toUpperCase();

    const msg = {
      to: order.customerInfo.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER,
        name: "EFT Technology",
      },
      subject: `${isVietnamese ? "Xác nhận đơn hàng" : "Order Confirmation"} #${orderNumber} - EFT Technology`,
      html: generateOrderEmailHTML(order, language),
    };

    const response = await sgMail.send(msg);

    console.log("✅ Order confirmation email sent successfully!");
    console.log("   Status:", response[0].statusCode);
    return { success: true, messageId: response[0].headers["x-message-id"] };
  } catch (error) {
    console.error("❌ Error sending order confirmation email:");
    console.error("   Error:", error.message);
    if (error.response) {
      console.error("   Response:", error.response.body);
    }
    return { success: false, error: error.message };
  }
};

// Send admin notification email
const sendAdminNotificationEmail = async (order, language = "vi") => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SendGrid not configured - SENDGRID_API_KEY missing");
    }

    console.log("📧 Sending admin notification via SendGrid...");

    const isVietnamese = language === "vi";
    const orderNumber = order._id.toString().slice(-8).toUpperCase();
    const adminEmail = process.env.EMAIL_TO || process.env.EMAIL_USER;

    const msg = {
      to: adminEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER,
        name: "EFT Technology",
      },
      subject: isVietnamese
        ? `Đơn hàng mới #${orderNumber} - ${order.customerInfo.email}`
        : `New Order #${orderNumber} - ${order.customerInfo.email}`,
      html: generateOrderEmailHTML(order, language),
    };

    const response = await sgMail.send(msg);

    console.log("✅ Admin notification sent successfully!");
    console.log("   Status:", response[0].statusCode);
    return { success: true, messageId: response[0].headers["x-message-id"] };
  } catch (error) {
    console.error("❌ Error sending admin notification:");
    console.error("   Error:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendAdminNotificationEmail,
};
