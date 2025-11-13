const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const Category = require("./models/Category");
const Product = require("./models/Product");
const CompanyInfo = require("./models/CompanyInfo");
const MediaSlide = require("./models/MediaSlide");
const Slogan = require("./models/Slogan");
const SupportArticle = require("./models/SupportArticle");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

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
      companyName: "Công Ty Thương Mại Điện Tử",
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
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Lazada_Logo.png/200px-Lazada_Logo.png",
          website: "https://lazada.vn",
        },
        {
          name: "Tiki",
          logo: "https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png",
          website: "https://tiki.vn",
        },
        {
          name: "Sendo",
          logo: "https://media.sendo.vn/image/png/logo_sendo.png",
          website: "https://sendo.vn",
        },
      ],
      topSectionBgColor: "#f0f0f0",
    });
    console.log("Created company info");

    // Create Categories
    const categories = await Category.create([
      {
        name: "Điện tử",
        slug: "dien-tu",
        description: "Thiết bị và đồ dùng điện tử",
        order: 1,
      },
      {
        name: "Quần áo",
        slug: "quan-ao",
        description: "Thời trang và trang phục",
        order: 2,
      },
      {
        name: "Nhà cửa & Vườn",
        slug: "nha-cua-vuon",
        description: "Đồ dùng cải thiện nhà cửa và vườn",
        order: 3,
      },
      {
        name: "Thể thao",
        slug: "the-thao",
        description: "Thiết bị và phụ kiện thể thao",
        order: 4,
      },
    ]);
    console.log("Created categories");

    // Create Products
    const products = await Product.create([
      {
        name: "Tai Nghe Không Dây",
        slug: "tai-nghe-khong-day",
        description: "Tai nghe không dây chất lượng cao với chống ồn",
        price: 2499000,
        category: categories[0]._id,
        images: ["https://via.placeholder.com/400x400?text=Tai+Nghe"],
        featured: true,
        inStock: true,
        options: [{ name: "Màu sắc", values: ["Đen", "Trắng", "Xanh"] }],
      },
      {
        name: "Đồng Hồ Thông Minh",
        slug: "dong-ho-thong-minh",
        description: "Đồng hồ thông minh đa tính năng với theo dõi sức khỏe",
        price: 4999000,
        category: categories[0]._id,
        images: ["https://via.placeholder.com/400x400?text=Dong+Ho"],
        featured: true,
        inStock: true,
      },
      {
        name: "Áo Thun Cotton",
        slug: "ao-thun-cotton",
        description: "Áo thun 100% cotton thoải mái",
        price: 199000,
        category: categories[1]._id,
        images: ["https://via.placeholder.com/400x400?text=Ao+Thun"],
        inStock: true,
        options: [
          { name: "Kích cỡ", values: ["S", "M", "L", "XL"] },
          { name: "Màu sắc", values: ["Đỏ", "Xanh", "Xanh Lá", "Đen"] },
        ],
      },
      {
        name: "Quần Jean",
        slug: "quan-jean",
        description: "Quần jean cổ điển với kiểu dáng hiện đại",
        price: 599000,
        category: categories[1]._id,
        images: ["https://via.placeholder.com/400x400?text=Quan+Jean"],
        featured: true,
        inStock: true,
      },
      {
        name: "Bộ Dụng Cụ Làm Vườn",
        slug: "bo-dung-cu-lam-vuon",
        description: "Bộ dụng cụ làm vườn đầy đủ thiết yếu",
        price: 999000,
        category: categories[2]._id,
        images: ["https://via.placeholder.com/400x400?text=Dung+Cu+Vuon"],
        inStock: true,
      },
      {
        name: "Thảm Tập Yoga",
        slug: "tham-tap-yoga",
        description: "Thảm yoga chống trượt cho buổi tập thoải mái",
        price: 299000,
        category: categories[3]._id,
        images: ["https://via.placeholder.com/400x400?text=Tham+Yoga"],
        featured: true,
        inStock: true,
        options: [
          { name: "Màu sắc", values: ["Tím", "Xanh", "Xanh Lá", "Hồng"] },
        ],
      },
    ]);
    console.log("Created products");

    // Create Media Slides (linked to products)
    const slides = await MediaSlide.create([
      {
        type: "image",
        url: "https://via.placeholder.com/1200x500/667eea/ffffff?text=Welcome+to+Our+Store",
        caption: "Chào Mừng Đến Với Cửa Hàng Của Chúng Tôi",
        linkToProduct: products[0]._id, // Link to first product
        order: 1,
        active: true,
      },
      {
        type: "image",
        url: "https://via.placeholder.com/1200x500/764ba2/ffffff?text=New+Arrivals",
        caption: "Hàng Mới Về - Khám Phá Ngay",
        linkToProduct: products[1]._id, // Link to second product
        order: 2,
        active: true,
      },
      {
        type: "image",
        url: "https://via.placeholder.com/1200x500/007bff/ffffff?text=Special+Offers",
        caption: "Ưu Đãi Đặc Biệt Trong Tuần",
        linkToProduct: products[2]._id, // Link to third product
        order: 3,
        active: true,
      },
      {
        type: "image",
        url: "https://via.placeholder.com/1200x500/28a745/ffffff?text=Best+Sellers",
        caption: "Sản Phẩm Bán Chạy Nhất",
        linkToProduct: products[3]._id, // Link to fourth product
        order: 4,
        active: true,
      },
      {
        type: "image",
        url: "https://via.placeholder.com/1200x500/ffc107/333333?text=Summer+Collection",
        caption: "Bộ Sưu Tập Mùa Hè 2025",
        linkToProduct: products[4]._id, // Link to fifth product
        order: 5,
        active: true,
      },
      {
        type: "image",
        url: "https://via.placeholder.com/1200x500/dc3545/ffffff?text=Limited+Time+Deals",
        caption: "Giảm Giá Có Hạn - Lên Đến 50%",
        linkToProduct: products[5]._id, // Link to sixth product
        order: 6,
        active: true,
      },
    ]);
    console.log("Created media slides");

    // Create Slogans
    const slogans = await Slogan.create([
      {
        text: "Sản Phẩm Chất Lượng Với Giá Cả Phải Chăng",
        order: 1,
        active: true,
      },
      { text: "Giao Hàng Nhanh Chóng Toàn Quốc", order: 2, active: true },
      { text: "Đảm Bảo Sự Hài Lòng Của Khách Hàng", order: 3, active: true },
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
