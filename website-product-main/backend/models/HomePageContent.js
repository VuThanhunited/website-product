const mongoose = require("mongoose");

const homePageContentSchema = new mongoose.Schema(
  {
    // Slideshow Title
    slideshowTitle: {
      title: { type: String, default: "Sản Phẩm Nổi Bật" },
      titleEn: { type: String, default: "Featured Products" },
    },

    // Features Title
    featuresTitle: {
      title: { type: String, default: "Tính Năng Nổi Bật" },
      titleEn: { type: String, default: "Outstanding Features" },
    },

    // Features Section
    features: [
      {
        icon: { type: String, default: "🚚" },
        title: { type: String, default: "" },
        titleEn: { type: String, default: "" },
        description: { type: String, default: "" },
        descriptionEn: { type: String, default: "" },
        order: { type: Number, default: 0 },
      },
    ],

    // Tech Articles Title
    techArticlesTitle: {
      title: { type: String, default: "Thông tin công nghệ kỹ thuật" },
      titleEn: { type: String, default: "Technical Information" },
    },

    // Tech Articles Section
    techArticles: [
      {
        title: { type: String, default: "" },
        titleEn: { type: String, default: "" },
        content: { type: String, default: "" },
        contentEn: { type: String, default: "" },
        thumbnail: { type: String, default: "" },
        link: { type: String, default: "" },
      },
    ],

    // Why Choose Us Section
    whyChooseUs: {
      title: { type: String, default: "Tại Sao Chọn Chúng Tôi?" },
      titleEn: { type: String, default: "Why Choose Us?" },
      items: [
        {
          icon: { type: String, default: "🏆" },
          title: { type: String, default: "" },
          titleEn: { type: String, default: "" },
          description: { type: String, default: "" },
          descriptionEn: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },

    // Call to Action Section
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

module.exports = mongoose.model("HomePageContent", homePageContentSchema);
