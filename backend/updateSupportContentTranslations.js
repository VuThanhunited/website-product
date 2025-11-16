const mongoose = require("mongoose");
const SupportArticle = require("./models/SupportArticle");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const dict = {
  // Cụm từ dài nhất - dịch trước
  "Chúng tôi cung cấp nhiều phương thức vận chuyển để đáp ứng nhu cầu của bạn:":
    "We provide various shipping methods to meet your needs:",
  "Chúng tôi chấp nhận các phương thức thanh toán sau:":
    "We accept the following payment methods:",
  "Chúng tôi chấp nhận đổi trả trong vòng": "We accept returns within",
  "Làm theo các bước đơn giản sau để đặt hàng:":
    "Follow these simple steps to place an order:",
  "Duyệt qua các sản phẩm của chúng tôi": "Browse through our products",
  "kể từ ngày mua hàng": "from the date of purchase",
  "Sản phẩm phải chưa sử dụng và còn nguyên bao bì":
    "Product must be unused and in original packaging",
  "sản phẩm phải chưa sử dụng và còn nguyên bao bì":
    "product must be unused and in original packaging",
  "ngày làm việc": "business days",
  "làm việc": "working days",
  "Áp dụng cho đơn hàng dưới": "Applies to orders under",
  "áp dụng cho đơn hàng dưới": "applies to orders under",
  "Áp dụng cho": "Applies to",
  "áp dụng cho": "applies to",
  "đơn hàng dưới": "orders under",
  "Thông tin tài khoản được gửi qua email sau khi đặt hàng":
    "Account information will be sent via email after placing order",
  "Thông tin tài khoản được gửi": "Account information will be sent",
  "được gửi qua email": "will be sent via email",
  "sau khi đặt hàng": "after placing order",
  "Giữ nguyên tem mác, nhãn hiệu": "Keep original labels and tags intact",
  "Giữ nguyên tem mác": "Keep original labels intact",
  "giữ nguyên": "keep intact",
  "tem mác": "labels",
  "nhãn hiệu": "tags",
  "Có hóa đơn mua hàng": "Have purchase invoice",
  "có hóa đơn": "have invoice",
  "hóa đơn": "invoice",
  "Không áp dụng cho sản phẩm giảm giá trên":
    "Not applicable for discounted products over",
  "Không áp dụng cho": "Not applicable for",
  "không áp dụng": "not applicable",
  "sản phẩm giảm giá": "discounted products",
  "giảm giá": "discounted",
  "Xem video hướng dẫn": "Watch tutorial video",
  "xem video": "watch video",
  "video hướng dẫn": "tutorial video",
  "quy trình": "process",
  "tải xuống": "download",
  "mẫu đơn": "form template",
  "tài liệu đầy đủ": "complete documentation",
  "tài liệu": "documentation",
  "đầy đủ": "complete",
  "bên dưới": "below",
  "Hoàn tất thanh toán": "Complete payment",
  "hoàn tất": "complete",
  "Để biết thêm chi tiết": "For more details",
  "để biết thêm": "for more",
  "biết thêm": "more",
  "chi tiết": "details",
  "vui lòng": "please",
  "bảng giá": "price list",
  "hỏa tốc": "express",

  // Thanh toán
  "Phương Thức Thanh Toán": "Payment Methods",
  "Phương thức thanh toán": "Payment methods",
  "phương thức thanh toán": "payment methods",
  "Thanh toán trực tuyến": "Online payment",
  "thanh toán trực tuyến": "online payment",
  "Thẻ tín dụng": "Credit cards",
  "Thẻ ATM nội địa": "Domestic ATM cards",
  "Ví điện tử": "E-wallets",
  "Chuyển khoản ngân hàng": "Bank transfer",
  "Thanh toán khi nhận hàng": "Cash on delivery",

  // Đổi trả
  "Chính Sách Đổi Trả": "Return Policy",
  "Chính sách đổi trả": "Return policy",
  "chính sách đổi trả": "return policy",
  "chấp nhận đổi trả": "accept returns",
  "Điều kiện đổi trả": "Return conditions",
  "trong vòng": "within",
  "kể từ ngày": "from the date of",
  "còn nguyên bao bì": "in original packaging",
  "chưa sử dụng": "unused",

  // Đặt hàng
  "Hướng Dẫn Đặt Hàng": "Order Guide",
  "Hướng dẫn đặt hàng": "Order guide",
  "hướng dẫn đặt hàng": "order guide",
  "Làm theo các bước": "Follow the steps",
  "đơn giản sau": "simple steps below",
  "để đặt hàng": "to place an order",
  "Duyệt qua các sản phẩm": "Browse through products",
  "Duyệt qua": "Browse through",
  "Thêm sản phẩm vào giỏ hàng": "Add products to shopping cart",
  "Tiến hành thanh toán": "Proceed to payment",

  // Vận chuyển
  "Thông Tin Vận Chuyển": "Shipping Information",
  "Thông tin vận chuyển": "Shipping information",
  "thông tin vận chuyển": "shipping information",
  "Vận chuyển tiêu chuẩn": "Standard shipping",
  "vận chuyển tiêu chuẩn": "standard shipping",
  "Vận chuyển nhanh": "Express shipping",
  "vận chuyển nhanh": "express shipping",
  "Vận chuyển hỏa tốc": "Express shipping",
  "vận chuyển hỏa tốc": "express shipping",
  "cung cấp nhiều phương thức vận chuyển": "provide various shipping methods",
  "cung cấp nhiều": "provide various",
  "phương thức vận chuyển": "shipping methods",
  "để đáp ứng nhu cầu của bạn": "to meet your needs",
  "đáp ứng nhu cầu": "meet needs",
  "của bạn": "your",
  "Thời gian giao hàng": "Delivery time",
  "Phí vận chuyển": "Shipping fee",
  "Nội thành": "Inner city",
  "Ngoại thành": "Suburban",
  "Tỉnh khác": "Other provinces",
  "Tính theo khoảng cách": "Calculated by distance",
  "tiêu chuẩn": "standard",
  "Tiêu chuẩn": "Standard",

  // Từ cơ bản
  "trực tuyến": "online",
  "nội địa": "domestic",
  "chấp nhận": "accept",
  "mua hàng": "purchase",
  "đặt hàng": "place order",
  "đơn hàng": "order",
  "thanh toán": "payment",
  "giao hàng": "delivery",
  "vận chuyển": "shipping",
  "đổi trả": "return",
  "sử dụng": "use",
  duyệt: "browse",
  "cung cấp": "provide",
  "đáp ứng": "meet",
  "nhu cầu": "needs",
  nhiều: "various",
  nhanh: "express",
  Nhanh: "Express",
  "sản phẩm": "products",
  "giỏ hàng": "shopping cart",
  "danh mục": "categories",
  "bao bì": "packaging",
  bước: "steps",
  "thời gian": "time",
  "tài khoản": "account",
  "thông tin": "information",
  phí: "fee",
  "khoảng cách": "distance",
  "tính theo": "calculated by",
  ngày: "days",
  bạn: "you",
  làm: "working",
  việc: "",
  qua: "via",
  email: "email",
  video: "video",
  cho: "for",
  trên: "over",
  dưới: "under",
  sau: "after",
  and: "and",

  // Từ nối
  "chúng tôi": "we",
  "Chúng tôi": "We",
  "của chúng tôi": "our",
  "sau đây": "following",
  "đơn giản": "simple",
  các: "",
  Các: "",
  của: "",
  và: "and",
  trong: "in",
  để: "to",
  vào: "to",
  theo: "by",
  còn: "in",
  phải: "must",
  với: "with",
  được: "",
  khi: "when",
  về: "about",
};
function translate(text) {
  if (!text) return text;
  let result = text;

  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);

  for (const vn of keys) {
    const en = dict[vn];
    const regex = new RegExp(vn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    result = result.replace(regex, en);
  }

  return result.replace(/\s+/g, " ").trim();
}

async function updateArticles() {
  try {
    // Đợi một chút sau khi connect
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const articles = await SupportArticle.find({});
    console.log(`\n📚 Updating ${articles.length} articles...\n`);

    for (const article of articles) {
      const translatedTitle = translate(article.title);
      const translatedContent = translate(article.content);

      article.titleEn = translatedTitle;
      article.contentEn = translatedContent;
      await article.save();

      console.log(`✅ ${article.title}`);
      console.log(`   Title EN: ${translatedTitle}`);
      console.log(
        `   VN: ${article.content.substring(0, 100).replace(/<[^>]*>/g, "")}...`
      );
      console.log(
        `   EN: ${translatedContent
          .substring(0, 100)
          .replace(/<[^>]*>/g, "")}...\n`
      );
    }

    console.log(`✅ Done! Updated ${articles.length} articles`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

updateArticles();
