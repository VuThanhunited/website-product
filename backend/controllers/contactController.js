const ContactMessage = require("../models/ContactMessage");
const nodemailer = require("nodemailer");

// Create email transporter với config tối ưu
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

// Template email liên hệ đẹp
const generateContactEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tin nhắn liên hệ mới</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">📧 Tin Nhắn Liên Hệ Mới</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">EFT Technology - Contact Form</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 10px 0; color: #667eea; font-size: 20px;">Thông tin người gửi</h2>
                <table width="100%" cellpadding="5" cellspacing="0">
                  <tr>
                    <td style="color: #666; font-weight: 600; width: 120px;">👤 Họ tên:</td>
                    <td style="color: #333; font-weight: bold;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="color: #666; font-weight: 600;">📧 Email:</td>
                    <td style="color: #333;"><a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="color: #666; font-weight: 600;">📱 Điện thoại:</td>
                    <td style="color: #333;"><a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">${data.phone || "Không có"}</a></td>
                  </tr>
                  <tr>
                    <td style="color: #666; font-weight: 600;">📋 Tiêu đề:</td>
                    <td style="color: #333; font-weight: bold;">${data.subject}</td>
                  </tr>
                  <tr>
                    <td style="color: #666; font-weight: 600;">🕐 Thời gian:</td>
                    <td style="color: #333;">${new Date().toLocaleString("vi-VN", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">💬 Nội dung tin nhắn:</h3>
                <div style="background-color: #fafbfc; padding: 20px; border-radius: 8px; border: 1px solid #e1e4e8;">
                  <p style="margin: 0; color: #333; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>

              <div style="background-color: #e7f3ff; border-left: 4px solid #0366d6; padding: 15px; margin-top: 30px; border-radius: 4px;">
                <p style="margin: 0; color: #0366d6; font-size: 14px;">
                  💡 <strong>Lưu ý:</strong> Hãy phản hồi tin nhắn này trong vòng 24 giờ để đảm bảo trải nghiệm khách hàng tốt nhất!
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                <strong>EFT Technology</strong>
              </p>
              <p style="margin: 0 0 5px 0; color: #888; font-size: 12px;">
                📍 123 Đường Kinh Doanh, Thành Phố, Quốc Gia
              </p>
              <p style="margin: 0; color: #888; font-size: 12px;">
                📞 +84 234 567 890 | 📧 info@eft-technology.com
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

// Email tự động phản hồi cho khách hàng
const generateAutoReplyTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cảm ơn bạn đã liên hệ</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">✅ Đã Nhận Tin Nhắn</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Cảm ơn bạn đã liên hệ với chúng tôi!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333;">
                Xin chào <strong>${data.name}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333;">
                Chúng tôi đã nhận được tin nhắn của bạn với tiêu đề: <strong>"${data.subject}"</strong>
              </p>
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #333;">
                Đội ngũ EFT Technology sẽ xem xét và phản hồi trong vòng <strong>24 giờ làm việc</strong>. 
                Nếu bạn cần hỗ trợ khẩn cấp, vui lòng liên hệ hotline: <a href="tel:+842345678890" style="color: #667eea; text-decoration: none;"><strong>+84 234 567 890</strong></a>
              </p>

              <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #28a745; font-size: 16px;">📋 Thông tin tin nhắn của bạn:</h3>
                <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${data.email}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Điện thoại:</strong> ${data.phone || "Không cung cấp"}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Tiêu đề:</strong> ${data.subject}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Thời gian:</strong> ${new Date().toLocaleString("vi-VN")}</p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://eft-company.vercel.app" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  🌐 Truy cập Website
                </a>
              </div>

              <div style="background-color: #e7f3ff; border-left: 4px solid #0366d6; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; color: #0366d6; font-size: 14px; line-height: 1.6;">
                  <strong>💡 Mẹo:</strong> Bạn có thể xem thêm các bài viết hỗ trợ tại <a href="https://eft-company.vercel.app/support" style="color: #0366d6;">Trung tâm hỗ trợ</a> để tìm câu trả lời nhanh hơn!
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                <strong>EFT Technology</strong><br>
                <em>Giải pháp công nghệ hàng đầu</em>
              </p>
              <p style="margin: 0 0 5px 0; color: #888; font-size: 12px;">
                📍 123 Đường Kinh Doanh, Thành Phố, Quốc Gia
              </p>
              <p style="margin: 0 0 10px 0; color: #888; font-size: 12px;">
                📞 +84 234 567 890 | 📧 info@eft-technology.com
              </p>
              <div style="margin-top: 15px;">
                <a href="https://facebook.com" style="display: inline-block; margin: 0 5px; color: #4267B2; font-size: 20px; text-decoration: none;">📘</a>
                <a href="https://twitter.com" style="display: inline-block; margin: 0 5px; color: #1DA1F2; font-size: 20px; text-decoration: none;">🐦</a>
                <a href="https://linkedin.com" style="display: inline-block; margin: 0 5px; color: #0077B5; font-size: 20px; text-decoration: none;">💼</a>
              </div>
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

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    console.log("📧 Receiving contact form:", { name, email, subject });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        error: "Vui lòng điền đầy đủ thông tin bắt buộc" 
      });
    }

    // Save to database
    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message,
    });
    await contactMessage.save();
    console.log("✅ Contact message saved to database");

    // Send notification email to admin
    const adminMailOptions = {
      from: `"EFT Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `🔔 Tin nhắn liên hệ mới: ${subject}`,
      html: generateContactEmailTemplate({ name, email, phone, subject, message }),
    };

    // Send auto-reply email to customer
    const customerMailOptions = {
      from: `"EFT Technology" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Đã nhận tin nhắn: ${subject}`,
      html: generateAutoReplyTemplate({ name, email, phone, subject, message }),
    };

    // Send both emails
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(customerMailOptions),
      ]);
      console.log("✅ Both emails sent successfully");
    } catch (emailError) {
      console.error("⚠️ Email sending error:", emailError);
      // Still return success since message was saved to DB
    }

    res.status(201).json({ 
      success: true,
      message: "Đã gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất." 
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({ 
      success: false,
      error: "Có lỗi xảy ra. Vui lòng thử lại sau." 
    });
  }
};

// Get all contact messages (for admin)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ error: "Không tìm thấy tin nhắn" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Không tìm thấy tin nhắn" });
    }
    res.json({ message: "Đã xóa tin nhắn thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
