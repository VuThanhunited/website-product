const { ApiClient, TransactionalEmailsApi, SendSmtpEmail } = require("@getbrevo/brevo");

// Initialize Brevo API
let apiInstance;

if (process.env.BREVO_API_KEY) {
  const defaultClient = ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  apiInstance = new TransactionalEmailsApi();
  console.log("✅ Brevo email service initialized");
} else {
  console.warn("⚠️  BREVO_API_KEY not found");
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
        <p style="margin: 5px 0; color: #555;">
          <strong>${isVietnamese ? "Mã đơn hàng:" : "Order ID:"}</strong> 
          #${order._id.toString().slice(-8).toUpperCase()}
        </p>
        <p style="margin: 5px 0; color: #555;">
          <strong>${isVietnamese ? "Phương thức thanh toán:" : "Payment Method:"}</strong> 
          ${paymentMethodText[order.paymentMethod] || order.paymentMethod}
        </p>
        <p style="margin: 5px 0; color: #555;">
          <strong>${isVietnamese ? "Trạng thái:" : "Status:"}</strong> 
          <span style="color: #f59e0b; font-weight: bold;">${isVietnamese ? "Đang xử lý" : "Processing"}</span>
        </p>
      </div>
      
      <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #667eea; font-size: 16px;">${
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
            <th style="padding: 12px; text-align: right;">${isVietnamese ? "Thành tiền" : "Total"}</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #666;">${isVietnamese ? "Tổng tiền hàng:" : "Subtotal:"}</span>
          <span style="color: #333; font-weight: bold;">${order.total.toLocaleString()}₫</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #666;">${isVietnamese ? "Phí vận chuyển:" : "Shipping:"}</span>
          <span style="color: #333; font-weight: bold;">${(order.shippingFee || 0).toLocaleString()}₫</span>
        </div>
        <div style="border-top: 2px solid #667eea; padding-top: 10px; margin-top: 10px; display: flex; justify-content: space-between;">
          <span style="color: #333; font-size: 18px; font-weight: bold;">${
            isVietnamese ? "Tổng cộng:" : "Total:"
          }</span>
          <span style="color: #667eea; font-size: 20px; font-weight: bold;">${(
            order.total + (order.shippingFee || 0)
          ).toLocaleString()}₫</span>
        </div>
      </div>
      
      <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 30px;">
        <p style="margin: 0; color: #856404; font-size: 14px;">
          <strong>📌 ${isVietnamese ? "Lưu ý:" : "Note:"}</strong><br>
          ${
            isVietnamese
              ? "Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng. Vui lòng giữ điện thoại để nhận cuộc gọi từ chúng tôi."
              : "We will contact you within 24 hours to confirm your order. Please keep your phone available to receive our call."
          }
        </p>
      </div>
      
      <p style="margin: 30px 0 10px 0; font-size: 14px; color: #666; text-align: center;">
        ${isVietnamese ? "Cảm ơn bạn đã tin tưởng EFT Technology!" : "Thank you for trusting EFT Technology!"}
      </p>
      <p style="margin: 0; font-size: 14px; color: #999; text-align: center;">
        ${isVietnamese ? "Nếu có thắc mắc, vui lòng liên hệ:" : "For questions, please contact:"} 
        <a href="mailto:${
          process.env.EMAIL_TO || "eft.gretech@gmail.com"
        }" style="color: #667eea; text-decoration: none;">
          ${process.env.EMAIL_TO || "eft.gretech@gmail.com"}
        </a>
      </p>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
      <p style="margin: 0; font-size: 12px; color: #999;">
        © 2024 EFT Technology. ${isVietnamese ? "Tất cả quyền được bảo lưu." : "All rights reserved."}
      </p>
    </div>
  </div>
</body>
</html>
`;
};

// Send order confirmation email to customer
const sendOrderConfirmationEmail = async (order, language = "vi") => {
  try {
    if (!apiInstance) {
      throw new Error("Brevo not configured - BREVO_API_KEY missing");
    }

    console.log("📧 Sending order confirmation email via Brevo...");
    console.log("   Order ID:", order._id);
    console.log("   Customer email:", order.customerInfo.email);

    const isVietnamese = language === "vi";
    const orderNumber = order._id.toString().slice(-8).toUpperCase();

    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.sender = { name: "EFT Technology", email: "no-reply@eft-chem.com" };
    sendSmtpEmail.to = [{ email: order.customerInfo.email, name: order.customerInfo.fullName }];
    sendSmtpEmail.subject = `${
      isVietnamese ? "Xác nhận đơn hàng" : "Order Confirmation"
    } #${orderNumber} - EFT Technology`;
    sendSmtpEmail.htmlContent = generateOrderEmailHTML(order, language);

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Order confirmation email sent successfully!");
    console.log("   Message ID:", data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("❌ Error sending order confirmation email:");
    console.error("   Error:", error.message || error);
    return { success: false, error: error.message };
  }
};

// Send admin notification email
const sendAdminNotificationEmail = async (order, language = "vi") => {
  try {
    if (!apiInstance) {
      throw new Error("Brevo not configured - BREVO_API_KEY missing");
    }

    console.log("📧 Sending admin notification via Brevo...");

    const isVietnamese = language === "vi";
    const orderNumber = order._id.toString().slice(-8).toUpperCase();
    const adminEmail = process.env.EMAIL_TO || "eft.gretech@gmail.com";

    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.sender = { name: "EFT Technology", email: "no-reply@eft-chem.com" };
    sendSmtpEmail.to = [{ email: adminEmail }];
    sendSmtpEmail.subject = isVietnamese
      ? `Đơn hàng mới #${orderNumber} - ${order.customerInfo.email}`
      : `New Order #${orderNumber} - ${order.customerInfo.email}`;
    sendSmtpEmail.htmlContent = generateOrderEmailHTML(order, language);

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Admin notification sent successfully!");
    console.log("   Message ID:", data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("❌ Error sending admin notification:");
    console.error("   Error:", error.message || error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendAdminNotificationEmail,
};
