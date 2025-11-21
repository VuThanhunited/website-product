import React, { useState } from "react";
import { submitContactForm } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        type: "error",
        message: language === "vi" 
          ? "Vui lòng điền đầy đủ các trường bắt buộc" 
          : "Please fill in all required fields",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await submitContactForm(formData);
      console.log("Contact form response:", response);
      
      setStatus({
        type: "success",
        message: language === "vi"
          ? "✅ Đã gửi tin nhắn thành công! Chúng tôi sẽ phản hồi trong vòng 24 giờ. Vui lòng kiểm tra email để nhận xác nhận."
          : "✅ Message sent successfully! We will respond within 24 hours. Please check your email for confirmation.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Auto hide success message after 8 seconds
      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 8000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message: language === "vi"
          ? "❌ Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua hotline."
          : "❌ An error occurred while sending the message. Please try again later or contact us directly via hotline.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>{t.contactUs}</h1>
        <p className="subtitle">{t.contactSubtitle}</p>

        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                {t.yourName} {t.required}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                {t.yourEmail} {t.required}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t.yourPhone}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                {t.subject} {t.required}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                {t.message} {t.required}
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {status.message && (
              <div className={`alert alert-${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? t.sending : t.sendMessage}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
