const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Import models
const Category = require("./models/Category");
const Product = require("./models/Product");
const CompanyInfo = require("./models/CompanyInfo");
const MediaSlide = require("./models/MediaSlide");
const Slogan = require("./models/Slogan");
const SupportArticle = require("./models/SupportArticle");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Helper function to create slug from Vietnamese text
const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Helper function to generate English product name and description
const generateEnglishContent = (product) => {
  const categoryMap = {
    "Chăm sóc lốp và cao su": "Tire & Rubber Care",
    "Vệ sinh và làm sạch": "Cleaning & Washing",
    "Nước làm mát động cơ": "Engine Coolant",
  };

  // Simple translation patterns
  let nameEn = product.name
    .replace(
      /Dung dịch làm bóng cao su và lốp xe/gi,
      "Tire & Rubber Shine Solution"
    )
    .replace(/Dung dịch làm sạch bề mặt ô tô/gi, "Car Surface Cleaner")
    .replace(
      /Dung dịch vệ sinh vành, lốp và cao su ngoại thất/gi,
      "Wheel, Tire & Rubber Cleaner"
    )
    .replace(/Nước làm mát động cơ/gi, "Engine Coolant")
    .replace(/Nước rửa kính ô tô/gi, "Car Glass Cleaner")
    .replace(/Nước rửa xe không chạm/gi, "Touchless Car Wash")
    .replace(/tím/gi, "Purple")
    .replace(/xanh/gi, "Green")
    .replace(/Can/gi, "Can")
    .replace(/lít/gi, "L")
    .replace(/tỉ lệ/gi, "Ratio")
    .replace(/Mã Kuiper/gi, "Kuiper Code");

  let descEn = product.description
    .replace(/chuyên dụng/gi, "professional")
    .replace(/dung tích/gi, "capacity")
    .replace(/sản phẩm/gi, "product")
    .replace(/chất lượng cao/gi, "high quality")
    .replace(/bảo vệ/gi, "protect")
    .replace(/an toàn/gi, "safe")
    .replace(/hiệu quả/gi, "effective")
    .replace(/nhanh chóng/gi, "fast")
    .replace(/tiện dụng/gi, "convenient")
    .replace(/phù hợp/gi, "suitable");

  return { nameEn, descEn };
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await CompanyInfo.deleteMany({});
    await MediaSlide.deleteMany({});
    await Slogan.deleteMany({});
    await SupportArticle.deleteMany({});

    console.log("Cleared existing data");

    // Create Company Info
    const companyInfo = await CompanyInfo.create({
      companyName: "EFT Technology Co., Ltd.",
      logo: "/uploads/logo.png",
      address: "123 Đường Kinh Doanh, Thành Phố, Quốc Gia",
      phone: "+84 234 567 890",
      email: "info@congty.vn",
      about:
        "<h2>Về Công Ty Chúng Tôi</h2><p>Chúng tôi là nhà cung cấp hàng đầu các sản phẩm chất lượng cao...</p>",
      socialLinks: {
        zalo: "https://zalo.me/congtyban",
        youtube: "https://youtube.com/@congtyban",
        instagram: "https://instagram.com/congtyban",
        whatsapp: "84234567890",
      },
      partners: [
        {
          name: "Shopee",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/200px-Shopee_logo.svg.png",
          website: "https://shopee.vn",
        },
        {
          name: "Lazada",
          logo: "https://lzd-img-global.slatic.net/g/p/c8045982f9234585c82ed024ed29861f.png",
          website: "https://lazada.vn",
        },
        {
          name: "Tiki",
          logo: "https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png",
          website: "https://tiki.vn",
        },
      ],
      topSectionBgColor: "#f0f0f0",
    });
    console.log("Created company info");

    // Load products from product.json
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "product.json"), "utf-8")
    );

    // Create Categories from products
    const categoryNames = [...new Set(productsData.map((p) => p.category))];

    const categories = await Category.create(
      categoryNames.map((name, index) => ({
        name: name,
        slug: createSlug(name),
        description: `Sản phẩm ${name}`,
        order: index + 1,
      }))
    );
    console.log(`Created ${categories.length} categories`);

    // Create Products from product.json
    const products = await Product.create(
      productsData.map((product, index) => {
        const category = categories.find((c) => c.name === product.category);
        const priceValue = parseInt(product.price.replace(/[^0-9]/g, ""));
        const { nameEn, descEn } = generateEnglishContent(product);

        return {
          name: product.name,
          nameEn: nameEn,
          slug: createSlug(product.name).substring(0, 100),
          description: product.description,
          descriptionEn: descEn,
          price: priceValue,
          category: category._id,
          images: [product.image],
          featured: index < 6, // First 6 products are featured
          inStock: true,
          stock: 100,
        };
      })
    );
    console.log(`Created ${products.length} products`);

    // Create Media Slides (linked to products)
    const slides = await MediaSlide.create(
      products.slice(0, 6).map((product, index) => ({
        type: "image",
        url: product.images[0],
        caption:
          product.name.length > 100
            ? product.name.substring(0, 97) + "..."
            : product.name,
        linkToProduct: product._id,
        order: index + 1,
        active: true,
      }))
    );
    console.log(`Created ${slides.length} media slides`);

    // Create Slogans
    const slogans = await Slogan.create([
      {
        text: "Sản Phẩm Chất Lượng Với Giá Cả Phải Chăng",
        textEn: "Quality Products at Affordable Prices",
        order: 1,
        active: true,
      },
      {
        text: "Giao Hàng Nhanh Chóng Toàn Quốc",
        textEn: "Fast Nationwide Delivery",
        order: 2,
        active: true,
      },
      {
        text: "Đảm Bảo Sự Hài Lòng Của Khách Hàng",
        textEn: "Customer Satisfaction Guaranteed",
        order: 3,
        active: true,
      },
    ]);
    console.log("Created slogans");

    // Create Support Articles
    const articles = await SupportArticle.create([
      {
        title: "Hướng Dẫn Đặt Hàng",
        slug: "huong-dan-dat-hang",
        content:
          "<p>Làm theo các bước đơn giản sau để đặt hàng:</p><ol><li>Duyệt qua các sản phẩm của chúng tôi</li><li>Thêm sản phẩm vào giỏ hàng</li><li>Tiến hành thanh toán</li><li>Hoàn tất thanh toán</li></ol><p>Để biết thêm chi tiết, vui lòng xem video hướng dẫn và tải xuống tài liệu đầy đủ bên dưới.</p>",
        thumbnail:
          "https://via.placeholder.com/300x200?text=Huong+Dan+Dat+Hang",
        images: [
          "https://via.placeholder.com/600x400?text=Buoc+1+Duyet+San+Pham",
          "https://via.placeholder.com/600x400?text=Buoc+2+Them+Gio+Hang",
        ],
        videos: [
          "https://www.w3schools.com/html/mov_bbb.mp4",
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        ],
        attachments: [
          {
            filename: "Huong_Dan_Dat_Hang_Chi_Tiet.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            filesize: 245000,
          },
          {
            filename: "Mau_Don_Dat_Hang.xlsx",
            filepath:
              "https://file-examples.com/storage/fe783855be66792c45d0f28/2017/02/file_example_XLSX_10.xlsx",
            filesize: 15000,
          },
        ],
        published: true,
      },
      {
        title: "Thông Tin Vận Chuyển",
        slug: "thong-tin-van-chuyen",
        content:
          "<p>Chúng tôi cung cấp nhiều phương thức vận chuyển để đáp ứng nhu cầu của bạn:</p><p><strong>Vận chuyển tiêu chuẩn:</strong> 5-7 ngày làm việc</p><p><strong>Vận chuyển nhanh:</strong> 2-3 ngày làm việc</p><p><strong>Vận chuyển hỏa tốc:</strong> 1 ngày làm việc</p><p>Xem video hướng dẫn về quy trình vận chuyển và tải xuống bảng giá chi tiết bên dưới.</p>",
        thumbnail: "https://via.placeholder.com/300x200?text=Van+Chuyen",
        videos: [
          "https://www.w3schools.com/html/mov_bbb.mp4",
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        ],
        attachments: [
          {
            filename: "Bang_Gia_Van_Chuyen.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            filesize: 180000,
          },
          {
            filename: "Dieu_Khoan_Van_Chuyen.docx",
            filepath:
              "https://file-examples.com/storage/fe783855be66792c45d0f28/2017/02/file-sample_100kB.doc",
            filesize: 98000,
          },
        ],
        published: true,
      },
      {
        title: "Chính Sách Đổi Trả",
        slug: "chinh-sach-doi-tra",
        content:
          "<p>Chúng tôi chấp nhận đổi trả trong vòng <strong>30 ngày</strong> kể từ ngày mua hàng.</p><h3>Điều kiện đổi trả:</h3><ul><li>Sản phẩm phải chưa sử dụng và còn nguyên bao bì</li><li>Giữ nguyên tem mác, nhãn hiệu</li><li>Có hóa đơn mua hàng</li><li>Không áp dụng cho sản phẩm giảm giá trên 50%</li></ul><p>Xem video hướng dẫn quy trình đổi trả và tải xuống mẫu đơn.</p>",
        thumbnail: "https://via.placeholder.com/300x200?text=Doi+Tra",
        images: ["https://via.placeholder.com/600x400?text=Quy+Trinh+Doi+Tra"],
        videos: [
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        ],
        attachments: [
          {
            filename: "Mau_Don_Doi_Tra.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            filesize: 125000,
          },
          {
            filename: "Chinh_Sach_Doi_Tra_Chi_Tiet.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            filesize: 220000,
          },
        ],
        published: true,
      },
      {
        title: "Phương Thức Thanh Toán",
        slug: "phuong-thuc-thanh-toan",
        content:
          "<p>Chúng tôi chấp nhận các phương thức thanh toán sau:</p><h3>Thanh toán trực tuyến:</h3><ul><li>Thẻ tín dụng (Visa, MasterCard, Amex)</li><li>Thẻ ATM nội địa</li><li>Ví điện tử (MoMo, ZaloPay, VNPay)</li><li>PayPal</li></ul><h3>Thanh toán khi nhận hàng (COD):</h3><p>Áp dụng cho đơn hàng dưới 5.000.000 VNĐ</p><h3>Chuyển khoản ngân hàng:</h3><p>Thông tin tài khoản được gửi qua email sau khi đặt hàng.</p><p>Xem video hướng dẫn thanh toán trực tuyến bên dưới.</p>",
        thumbnail: "https://via.placeholder.com/300x200?text=Thanh+Toan",
        images: [
          "https://via.placeholder.com/600x400?text=Phuong+Thuc+Thanh+Toan",
        ],
        videos: [
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        ],
        attachments: [
          {
            filename: "Huong_Dan_Thanh_Toan_Online.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            filesize: 195000,
          },
          {
            filename: "Thong_Tin_Tai_Khoan_Ngan_Hang.pdf",
            filepath:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            filesize: 85000,
          },
        ],
        published: true,
      },
    ]);
    console.log("Created support articles");

    console.log("\n✅ Sample data seeded successfully!");
    console.log("\nCreated:");
    console.log(`- 1 Company Info`);
    console.log(`- ${categories.length} Categories`);
    console.log(`- ${products.length} Products`);
    console.log(`- ${slides.length} Media Slides`);
    console.log(`- ${slogans.length} Slogans`);
    console.log(`- ${articles.length} Support Articles`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
