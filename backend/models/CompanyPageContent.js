const mongoose = require("mongoose");

const companyPageContentSchema = new mongoose.Schema(
  {
    // Hero Section
    hero: {
      title: {
        type: String,
        default:
          "Về Chúng Tôi - Công Ty TNHH Phát Triển Công Nghệ Ứng Dụng EFT",
      },
      titleEn: {
        type: String,
        default: "About Us - EFT Technology Development Company",
      },
      subtitle: { type: String, default: "Đối tác tin cậy của bạn" },
      subtitleEn: { type: String, default: "Your Trusted Partner" },
    },

    // Company Intro
    intro: {
      title: { type: String, default: "Câu Chuyện Của Chúng Tôi" },
      titleEn: { type: String, default: "Our Story" },
      paragraph1: { type: String, default: "" },
      paragraph1En: { type: String, default: "" },
      paragraph2: { type: String, default: "" },
      paragraph2En: { type: String, default: "" },
    },

    // Core Values
    values: {
      title: { type: String, default: "Giá Trị Cốt Lõi" },
      titleEn: { type: String, default: "Our Core Values" },
      items: [
        {
          icon: { type: String, default: "🎯" },
          title: { type: String, default: "" },
          titleEn: { type: String, default: "" },
          description: { type: String, default: "" },
          descriptionEn: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },

    // Achievements
    achievements: {
      title: { type: String, default: "Thành Tựu Của Chúng Tôi" },
      titleEn: { type: String, default: "Our Achievements" },
      items: [
        {
          number: { type: String, default: "15+" },
          label: { type: String, default: "" },
          labelEn: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },

    // Gallery Section
    gallery: {
      title: { type: String, default: "Thư Viện Ảnh" },
      titleEn: { type: String, default: "Our Gallery" },
    },

    // CTA Section
    cta: {
      title: { type: String, default: "Sẵn Sàng Trải Nghiệm?" },
      titleEn: { type: String, default: "Ready to Experience?" },
      description: {
        type: String,
        default: "Liên hệ với chúng tôi ngay hôm nay",
      },
      descriptionEn: { type: String, default: "Contact us today" },
      primaryButtonText: { type: String, default: "Xem Sản Phẩm" },
      primaryButtonTextEn: { type: String, default: "View Products" },
      primaryButtonLink: { type: String, default: "/products" },
      secondaryButtonText: { type: String, default: "Liên Hệ Ngay" },
      secondaryButtonTextEn: { type: String, default: "Contact Now" },
      secondaryButtonLink: { type: String, default: "/contact" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompanyPageContent", companyPageContentSchema);
