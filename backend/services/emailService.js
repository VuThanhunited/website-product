const nodemailer = require("nodemailer");

// Tạo transporter để gửi email - với config tối ưu cho Gmail
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

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter verification failed:", error.message);
  } else {
    console.log("✅ Gmail SMTP email service is ready");
  }
});

// Template email xác nhận đơn hàng
const generateOrderEmailTemplate = (order, language = "vi") => {
  const isVietnamese = language === "vi";

  const title = isVietnamese ? "Xác Nhận Đơn Hàng" : "Order Confirmation";
  const greeting = isVietnamese ? `Xin chào ${order.customerInfo.fullName},` : `Hello ${order.customerInfo.fullName},`;
  const thankYou = isVietnamese
    ? "Cảm ơn bạn đã đặt hàng tại EFT Technology!"
    : "Thank you for your order at EFT Technology!";
  const orderInfo = isVietnamese ? "Thông tin đơn hàng:" : "Order information:";
  const orderNumber = isVietnamese ? "Mã đơn hàng" : "Order number";
  const orderDate = isVietnamese ? "Ngày đặt" : "Order date";
  const paymentMethod = isVietnamese ? "Phương thức thanh toán" : "Payment method";
  const shippingAddress = isVietnamese ? "Địa chỉ giao hàng" : "Shipping address";
  const productsTitle = isVietnamese ? "Sản phẩm" : "Products";
  const quantity = isVietnamese ? "Số lượng" : "Quantity";
  const price = isVietnamese ? "Đơn giá" : "Price";
  const subtotal = isVietnamese ? "Tạm tính" : "Subtotal";
  const shippingFee = isVietnamese ? "Phí vận chuyển" : "Shipping fee";
  const total = isVietnamese ? "Tổng cộng" : "Total";
  const note = isVietnamese
    ? "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng."
    : "We will contact you as soon as possible to confirm your order.";
  const contactInfo = isVietnamese ? "Thông tin liên hệ:" : "Contact information:";
  const regards = isVietnamese ? "Trân trọng," : "Best regards,";

  const paymentMethodText = {
    cod: isVietnamese ? "Thanh toán khi nhận hàng (COD)" : "Cash on delivery (COD)",
    bank: isVietnamese ? "Chuyển khoản ngân hàng" : "Bank transfer",
    card: isVietnamese ? "Thẻ tín dụng/Ghi nợ" : "Credit/Debit card",
    ewallet: isVietnamese ? "Ví điện tử" : "E-wallet",
  };

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.productName}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${item.price.toLocaleString()}đ</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${(
        item.quantity * item.price
      ).toLocaleString()}đ</td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">EFT Technology</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">${title}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333;">${greeting}</p>
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #333;">${thankYou}</p>

              <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #667eea; font-size: 18px;">${orderInfo}</h2>
                <p style="margin: 5px 0; color: #555;"><strong>${orderNumber}:</strong> #${order._id
    .toString()
    .slice(-8)
    .toUpperCase()}</p>
                <p style="margin: 5px 0; color: #555;"><strong>${orderDate}:</strong> ${new Date(
    order.createdAt
  ).toLocaleString(isVietnamese ? "vi-VN" : "en-US")}</p>
                <p style="margin: 5px 0; color: #555;"><strong>${paymentMethod}:</strong> ${
    paymentMethodText[order.paymentMethod] || order.paymentMethod
  }</p>
              </div>

              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">${shippingAddress}:</h3>
                <p style="margin: 5px 0; color: #555; line-height: 1.6;">
                  ${order.customerInfo.fullName}<br>
                  ${order.customerInfo.phone}<br>
                  ${order.customerInfo.email}<br>
                  ${order.customerInfo.address}${order.customerInfo.ward ? ", " + order.customerInfo.ward : ""}${
    order.customerInfo.district ? ", " + order.customerInfo.district : ""
  }<br>
                  ${order.customerInfo.city}
                </p>
              </div>

              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">${productsTitle}:</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #eee; border-radius: 4px; overflow: hidden; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #333;">${productsTitle}</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #333;">${quantity}</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #333;">${price}</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #333;">${total}</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px;">
                <table width="100%" cellpadding="5" cellspacing="0">
                  <tr>
                    <td style="text-align: right; color: #555;">${subtotal}:</td>
                    <td style="text-align: right; font-weight: 600; color: #333; width: 120px;">${order.subtotal.toLocaleString()}đ</td>
                  </tr>
                  <tr>
                    <td style="text-align: right; color: #555;">${shippingFee}:</td>
                    <td style="text-align: right; font-weight: 600; color: #333;">${order.shippingFee.toLocaleString()}đ</td>
                  </tr>
                  <tr style="border-top: 2px solid #667eea;">
                    <td style="text-align: right; padding-top: 10px; font-size: 18px; font-weight: bold; color: #667eea;">${total}:</td>
                    <td style="text-align: right; padding-top: 10px; font-size: 18px; font-weight: bold; color: #667eea;">${order.total.toLocaleString()}đ</td>
                  </tr>
                </table>
              </div>

              ${
                order.customerInfo.notes
                  ? `
              <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0; color: #856404;"><strong>${isVietnamese ? "Ghi chú:" : "Note:"}</strong> ${
                      order.customerInfo.notes
                    }</p>
              </div>
              `
                  : ""
              }

              <p style="margin: 30px 0 20px 0; font-size: 14px; line-height: 1.6; color: #555;">${note}</p>

              <div style="background-color: #e7f3ff; padding: 20px; border-radius: 4px; margin-top: 30px;">
                <p style="margin: 0 0 10px 0; font-weight: 600; color: #333;">${contactInfo}</p>
                <p style="margin: 5px 0; color: #555;">📧 Email: ${process.env.EMAIL_USER}</p>
                <p style="margin: 5px 0; color: #555;">📞 ${isVietnamese ? "Hotline" : "Phone"}: 1900-xxxx</p>
                <p style="margin: 5px 0; color: #555;">🌐 Website: www.efttechnology.com</p>
              </div>

              <p style="margin: 30px 0 0 0; font-size: 16px; color: #333;">${regards}</p>
              <p style="margin: 5px 0 0 0; font-weight: 600; color: #667eea;">EFT Technology</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 12px; color: #999;">
                ${
                  isVietnamese
                    ? "Email này được gửi tự động, vui lòng không trả lời."
                    : "This is an automated email, please do not reply."
                }
              </p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">
                © 2025 EFT Technology. ${isVietnamese ? "Bản quyền thuộc về" : "All rights reserved"}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Gửi email xác nhận đơn hàng
const sendOrderConfirmationEmail = async (order, language = "vi") => {
  try {
    console.log("📧 Preparing to send order confirmation email...");
    console.log("   Order ID:", order._id);
    console.log("   Customer email:", order.customerInfo.email);
    console.log("   Language:", language);

    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email configuration missing (EMAIL_USER or EMAIL_PASS)");
    }

    const isVietnamese = language === "vi";
    const orderNumber = order._id.toString().slice(-8).toUpperCase();
    const subject = isVietnamese
      ? `Xác nhận đơn hàng #${orderNumber} - EFT Technology`
      : `Order Confirmation #${orderNumber} - EFT Technology`;

    const mailOptions = {
      to: order.customerInfo.email,
      from: {
        name: "EFT Technology",
        address: process.env.EMAIL_USER,
      },
      subject: subject,
      html: generateOrderEmailTemplate(order, language),
      replyTo: process.env.EMAIL_USER,
    };

    console.log("   =============================================");
    console.log("   📧 EMAIL DETAILS:");
    console.log("   FROM:", process.env.EMAIL_USER);
    console.log("   TO:", order.customerInfo.email);
    console.log("   SUBJECT:", subject);
    console.log("   =============================================");

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Order confirmation email sent successfully!");
    console.log("   Message ID:", info.messageId);
    console.log("   Response:", info.response);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending order confirmation email:");
    console.error("   Error message:", error.message);
    console.error("   Error code:", error.code);
    console.error("   Error command:", error.command);
    console.error("   Error response:", error.response);
    console.error("   Full error:", error);
    return { success: false, error: error.message };
  }
};

// Gửi email thông báo cho admin
const sendAdminNotificationEmail = async (order, language = "vi") => {
  try {
    console.log("📧 Preparing to send admin notification email...");
    console.log("   Order ID:", order._id);

    const isVietnamese = language === "vi";
    const orderNumber = order._id.toString().slice(-8).toUpperCase();
    const subject = isVietnamese ? `Đơn hàng mới #${orderNumber}` : `New Order #${orderNumber}`;

    const adminEmail = process.env.EMAIL_TO || process.env.EMAIL_USER;
    console.log("   Sending admin notification to:", adminEmail);

    const mailOptions = {
      from: {
        name: "EFT Technology",
        address: process.env.EMAIL_USER,
      },
      to: adminEmail,
      subject: subject,
      html: `
        <h2>${isVietnamese ? "Đơn hàng mới từ" : "New order from"}: ${order.customerInfo.fullName}</h2>
        <p><strong>${isVietnamese ? "Mã đơn" : "Order ID"}:</strong> ${order._id}</p>
        <p><strong>Email:</strong> ${order.customerInfo.email}</p>
        <p><strong>${isVietnamese ? "Điện thoại" : "Phone"}:</strong> ${order.customerInfo.phone}</p>
        <p><strong>${isVietnamese ? "Tổng tiền" : "Total"}:</strong> ${order.total.toLocaleString()}đ</p>
        <p><strong>${isVietnamese ? "Phương thức thanh toán" : "Payment method"}:</strong> ${order.paymentMethod}</p>
        <p><a href="http://localhost:3001" style="background-color: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">${
          isVietnamese ? "Xem chi tiết" : "View details"
        }</a></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Admin notification email sent successfully!");
    console.log("   Message ID:", info.messageId);
    console.log("   Response:", info.response);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending admin notification email:");
    console.error("   Error message:", error.message);
    console.error("   Error code:", error.code);
    console.error("   Full error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendAdminNotificationEmail,
};
