const mongoose = require("mongoose");
const dotenv = require("dotenv");
const HomePageContent = require("./models/HomePageContent");
const CompanyPageContent = require("./models/CompanyPageContent");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const seedHomePageContent = async () => {
  try {
    // Check if content already exists
    const existing = await HomePageContent.findOne();
    if (existing) {
      console.log("⚠️  Home page content already exists. Skipping...");
      return;
    }

    const homeContent = await HomePageContent.create({
      features: [
        {
          icon: "🚚",
          title: "Miễn Phí Vận Chuyển",
          titleEn: "Free Shipping",
          description: "Cho đơn hàng trên 500K",
          descriptionEn: "For orders over 500K",
          order: 1,
        },
        {
          icon: "✅",
          title: "Hàng Chính Hãng",
          titleEn: "Authentic Products",
          description: "100% hàng chính hãng",
          descriptionEn: "100% authentic products",
          order: 2,
        },
        {
          icon: "💳",
          title: "Thanh Toán Linh Hoạt",
          titleEn: "Flexible Payment",
          description: "Nhiều hình thức thanh toán",
          descriptionEn: "Multiple payment methods",
          order: 3,
        },
        {
          icon: "🎁",
          title: "Ưu Đãi Hấp Dẫn",
          titleEn: "Attractive Offers",
          description: "Nhiều chương trình khuyến mãi",
          descriptionEn: "Many promotional programs",
          order: 4,
        },
      ],
      whyChooseUs: {
        title: "Tại Sao Chọn Chúng Tôi",
        titleEn: "Why Choose Us",
        items: [
          {
            icon: "🏆",
            title: "Uy Tín Hàng Đầu",
            titleEn: "Top Reputation",
            description: "Được khách hàng tin tưởng",
            descriptionEn: "Trusted by customers",
            order: 1,
          },
          {
            icon: "🔬",
            title: "Chất Lượng Đảm Bảo",
            titleEn: "Guaranteed Quality",
            description: "Sản phẩm chất lượng cao",
            descriptionEn: "High-quality products",
            order: 2,
          },
          {
            icon: "💬",
            title: "Hỗ Trợ 24/7",
            titleEn: "24/7 Support",
            description: "Luôn sẵn sàng hỗ trợ",
            descriptionEn: "Always ready to help",
            order: 3,
          },
          {
            icon: "⚡",
            title: "Giao Hàng Nhanh",
            titleEn: "Fast Delivery",
            description: "Giao hàng toàn quốc",
            descriptionEn: "Nationwide delivery",
            order: 4,
          },
        ],
      },
      cta: {
        title: "Sẵn Sàng Mua Sắm?",
        titleEn: "Ready to Shop?",
        description: "Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi",
        descriptionEn: "Explore our diverse product collection",
        primaryButtonText: "Xem Sản Phẩm",
        primaryButtonTextEn: "View Products",
        primaryButtonLink: "/products",
        secondaryButtonText: "Liên Hệ Ngay",
        secondaryButtonTextEn: "Contact Now",
        secondaryButtonLink: "/contact",
      },
    });

    console.log("✅ Home page content seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding home page content:", error);
  }
};

const seedCompanyPageContent = async () => {
  try {
    // Check if content already exists
    const existing = await CompanyPageContent.findOne();
    if (existing) {
      console.log("⚠️  Company page content already exists. Skipping...");
      return;
    }

    const companyContent = await CompanyPageContent.create({
      hero: {
        title: "Về Chúng Tôi - Công Ty TNHH Phát Triển Công Nghệ Ứng Dụng EFT",
        titleEn: "About Us - EFT Technology Development Company",
        subtitle: "Đối tác tin cậy của bạn trong lĩnh vực công nghệ",
        subtitleEn: "Your Trusted Partner in Technology",
      },
      intro: {
        title: "Câu Chuyện Của Chúng Tôi",
        titleEn: "Our Story",
        paragraph1:
          "Công ty TNHH Phát Triển Công Nghệ Ứng Dụng EFT được thành lập với sứ mệnh mang đến những giải pháp công nghệ tiên tiến và sản phẩm chất lượng cao cho khách hàng. Chúng tôi tự hào là đối tác đáng tin cậy của nhiều doanh nghiệp và cá nhân trên toàn quốc.",
        paragraph1En:
          "EFT Technology Development Company was established with the mission of bringing advanced technology solutions and high-quality products to customers. We are proud to be a trusted partner of many businesses and individuals nationwide.",
        paragraph2:
          "Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi cam kết cung cấp sản phẩm và dịch vụ tốt nhất, đáp ứng mọi nhu cầu của khách hàng.",
        paragraph2En:
          "With a team of experienced experts and modern facilities, we are committed to providing the best products and services, meeting all customer needs.",
      },
      values: {
        title: "Giá Trị Cốt Lõi",
        titleEn: "Our Core Values",
        items: [
          {
            icon: "🎯",
            title: "Tầm Nhìn",
            titleEn: "Vision",
            description: "Trở thành đơn vị hàng đầu trong lĩnh vực công nghệ",
            descriptionEn: "Become a leading company in the technology sector",
            order: 1,
          },
          {
            icon: "🤝",
            title: "Cam Kết",
            titleEn: "Commitment",
            description: "Cam kết chất lượng và uy tín trong từng sản phẩm",
            descriptionEn:
              "Commitment to quality and reputation in every product",
            order: 2,
          },
          {
            icon: "💡",
            title: "Sáng Tạo",
            titleEn: "Innovation",
            description: "Không ngừng đổi mới và cải tiến công nghệ",
            descriptionEn: "Continuous innovation and technology improvement",
            order: 3,
          },
          {
            icon: "❤️",
            title: "Tận Tâm",
            titleEn: "Dedication",
            description: "Luôn đặt khách hàng làm trung tâm",
            descriptionEn: "Always put customers at the center",
            order: 4,
          },
        ],
      },
      achievements: {
        title: "Thành Tựu Của Chúng Tôi",
        titleEn: "Our Achievements",
        items: [
          {
            number: "15+",
            label: "Sản Phẩm",
            labelEn: "Products",
            order: 1,
          },
          {
            number: "1000+",
            label: "Khách Hàng Hài Lòng",
            labelEn: "Happy Customers",
            order: 2,
          },
          {
            number: "5+",
            label: "Năm Kinh Nghiệm",
            labelEn: "Years Experience",
            order: 3,
          },
          {
            number: "99%",
            label: "Đánh Giá Tích Cực",
            labelEn: "Positive Reviews",
            order: 4,
          },
        ],
      },
      gallery: {
        title: "Thư Viện Ảnh",
        titleEn: "Our Gallery",
      },
      cta: {
        title: "Sẵn Sàng Trải Nghiệm?",
        titleEn: "Ready to Experience?",
        description:
          "Liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết",
        descriptionEn: "Contact us today for detailed consultation",
        primaryButtonText: "Xem Sản Phẩm",
        primaryButtonTextEn: "View Products",
        primaryButtonLink: "/products",
        secondaryButtonText: "Liên Hệ Ngay",
        secondaryButtonTextEn: "Contact Now",
        secondaryButtonLink: "/contact",
      },
    });

    console.log("✅ Company page content seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding company page content:", error);
  }
};

const seedAll = async () => {
  await seedHomePageContent();
  await seedCompanyPageContent();
  console.log("✅ All content seeded successfully");
  process.exit(0);
};

seedAll();
