const mongoose = require("mongoose");
const SupportArticle = require("./models/SupportArticle");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const supportArticles = [
  {
    title: "Hướng dẫn đặt hàng trực tuyến",
    titleEn: "Online Ordering Guide",
    content: `
      <h2>Các bước đặt hàng</h2>
      <ol>
        <li><strong>Chọn sản phẩm:</strong> Duyệt qua danh mục sản phẩm và chọn sản phẩm bạn muốn mua</li>
        <li><strong>Thêm vào giỏ hàng:</strong> Nhấn nút "Thêm vào giỏ hàng" trên trang sản phẩm</li>
        <li><strong>Kiểm tra giỏ hàng:</strong> Nhấn vào biểu tượng giỏ hàng để xem các sản phẩm đã chọn</li>
        <li><strong>Điền thông tin:</strong> Nhập đầy đủ thông tin giao hàng và liên hệ</li>
        <li><strong>Chọn phương thức thanh toán:</strong> Chọn thanh toán khi nhận hàng (COD) hoặc chuyển khoản</li>
        <li><strong>Xác nhận đơn hàng:</strong> Kiểm tra lại thông tin và nhấn "Đặt hàng"</li>
      </ol>
      <p>Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng.</p>
    `,
    contentEn: `
      <h2>Order Steps</h2>
      <ol>
        <li><strong>Select Products:</strong> Browse product categories and choose items you want to buy</li>
        <li><strong>Add to Cart:</strong> Click "Add to Cart" button on product page</li>
        <li><strong>Review Cart:</strong> Click cart icon to view selected products</li>
        <li><strong>Fill Information:</strong> Enter complete delivery and contact information</li>
        <li><strong>Select Payment Method:</strong> Choose Cash on Delivery (COD) or Bank Transfer</li>
        <li><strong>Confirm Order:</strong> Review information and click "Place Order"</li>
      </ol>
      <p>We will contact you within 24 hours to confirm your order.</p>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    slug: "huong-dan-dat-hang",
    published: true,
  },
  {
    title: "Chính sách đổi trả hàng",
    titleEn: "Return & Exchange Policy",
    content: `
      <h2>Điều kiện đổi trả</h2>
      <p>Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng với các điều kiện sau:</p>
      <ul>
        <li>Sản phẩm còn nguyên tem mác, chưa qua sử dụng</li>
        <li>Sản phẩm bị lỗi do nhà sản xuất</li>
        <li>Giao sai sản phẩm hoặc thiếu hàng</li>
        <li>Sản phẩm không đúng như mô tả</li>
      </ul>
      
      <h3>Quy trình đổi trả</h3>
      <ol>
        <li>Liên hệ hotline: <strong>1900-xxxx</strong> để thông báo đổi trả</li>
        <li>Gửi sản phẩm về địa chỉ chúng tôi cung cấp</li>
        <li>Chúng tôi kiểm tra sản phẩm trong vòng 2-3 ngày làm việc</li>
        <li>Đổi sản phẩm mới hoặc hoàn tiền vào tài khoản của bạn</li>
      </ol>
      
      <p><strong>Lưu ý:</strong> Chi phí vận chuyển đổi trả do shop chúng tôi chịu nếu lỗi từ phía shop.</p>
    `,
    contentEn: `
      <h2>Return Conditions</h2>
      <p>We accept returns within 7 days from delivery date under following conditions:</p>
      <ul>
        <li>Product with original tags, unused</li>
        <li>Manufacturing defects</li>
        <li>Wrong product or missing items</li>
        <li>Product doesn't match description</li>
      </ul>
      
      <h3>Return Process</h3>
      <ol>
        <li>Contact hotline: <strong>1900-xxxx</strong> to notify return</li>
        <li>Send product to address we provide</li>
        <li>We inspect product within 2-3 business days</li>
        <li>Exchange new product or refund to your account</li>
      </ol>
      
      <p><strong>Note:</strong> Return shipping cost covered by us if fault from our side.</p>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    slug: "chinh-sach-doi-tra",
    published: true,
  },
  {
    title: "Câu hỏi thường gặp về thanh toán",
    titleEn: "Payment FAQs",
    content: `
      <h2>Các phương thức thanh toán</h2>
      
      <h3>1. Thanh toán khi nhận hàng (COD)</h3>
      <p>Bạn thanh toán trực tiếp cho nhân viên giao hàng khi nhận được sản phẩm. Phương thức này an toàn và thuận tiện nhất.</p>
      
      <h3>2. Chuyển khoản ngân hàng</h3>
      <p>Thông tin tài khoản:</p>
      <ul>
        <li>Ngân hàng: <strong>Vietcombank</strong></li>
        <li>Số tài khoản: <strong>0123456789</strong></li>
        <li>Chủ tài khoản: <strong>CÔNG TY ABC</strong></li>
      </ul>
      <p>Vui lòng ghi rõ nội dung chuyển khoản: <em>Họ tên + Số điện thoại</em></p>
      
      <h3>3. Thanh toán qua ví MoMo</h3>
      <p>Quét mã QR hoặc nhập số điện thoại ví MoMo để thanh toán nhanh chóng.</p>
      
      <h2>Câu hỏi thường gặp</h2>
      <p><strong>Q: Tôi có thể đổi phương thức thanh toán sau khi đặt hàng không?</strong></p>
      <p>A: Có thể. Vui lòng liên hệ với chúng tôi ngay sau khi đặt hàng để thay đổi.</p>
      
      <p><strong>Q: Tôi chuyển khoản nhưng chưa thấy xác nhận?</strong></p>
      <p>A: Vui lòng gửi bill chuyển khoản qua email hoặc tin nhắn cho chúng tôi để được xác nhận nhanh nhất.</p>
    `,
    contentEn: `
      <h2>Payment Methods</h2>
      
      <h3>1. Cash on Delivery (COD)</h3>
      <p>Pay directly to delivery staff when receiving product. This is the safest and most convenient method.</p>
      
      <h3>2. Bank Transfer</h3>
      <p>Account information:</p>
      <ul>
        <li>Bank: <strong>Vietcombank</strong></li>
        <li>Account number: <strong>0123456789</strong></li>
        <li>Account holder: <strong>ABC COMPANY</strong></li>
      </ul>
      <p>Please note transfer content: <em>Full name + Phone number</em></p>
      
      <h3>3. MoMo Wallet Payment</h3>
      <p>Scan QR code or enter MoMo wallet phone number for quick payment.</p>
      
      <h2>Frequently Asked Questions</h2>
      <p><strong>Q: Can I change payment method after ordering?</strong></p>
      <p>A: Yes. Please contact us immediately after placing order to change.</p>
      
      <p><strong>Q: I transferred but haven't received confirmation?</strong></p>
      <p>A: Please send transfer receipt via email or message for fastest confirmation.</p>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    slug: "thanh-toan",
    published: true,
  },
  {
    title: "Chính sách vận chuyển và giao hàng",
    titleEn: "Shipping & Delivery Policy",
    content: `
      <h2>Thời gian giao hàng</h2>
      <ul>
        <li><strong>Nội thành TP.HCM:</strong> 1-2 ngày làm việc</li>
        <li><strong>Các tỉnh thành khác:</strong> 3-5 ngày làm việc</li>
        <li><strong>Vùng xa, miền núi:</strong> 5-7 ngày làm việc</li>
      </ul>
      
      <h2>Phí vận chuyển</h2>
      <p>Chúng tôi áp dụng chính sách phí vận chuyển linh hoạt:</p>
      <ul>
        <li><strong>Miễn phí vận chuyển</strong> cho đơn hàng từ 500.000đ trở lên</li>
        <li>Phí vận chuyển <strong>30.000đ</strong> cho đơn hàng dưới 500.000đ (nội thành)</li>
        <li>Phí vận chuyển <strong>50.000đ</strong> cho đơn hàng dưới 500.000đ (ngoại thành)</li>
      </ul>
      
      <h2>Đối tác vận chuyển</h2>
      <p>Chúng tôi hợp tác với các đơn vị vận chuyển uy tín:</p>
      <ul>
        <li>Giao hàng nhanh (GHN)</li>
        <li>Giao hàng tiết kiệm (GHTK)</li>
        <li>Viettel Post</li>
      </ul>
      
      <p>Quý khách có thể theo dõi đơn hàng qua mã vận đơn được gửi trong email xác nhận.</p>
    `,
    contentEn: `
      <h2>Delivery Time</h2>
      <ul>
        <li><strong>Ho Chi Minh City:</strong> 1-2 business days</li>
        <li><strong>Other provinces:</strong> 3-5 business days</li>
        <li><strong>Remote areas:</strong> 5-7 business days</li>
      </ul>
      
      <h2>Shipping Fees</h2>
      <p>We apply flexible shipping fee policy:</p>
      <ul>
        <li><strong>Free shipping</strong> for orders from 500,000 VND and above</li>
        <li>Shipping fee <strong>30,000 VND</strong> for orders under 500,000 VND (urban)</li>
        <li>Shipping fee <strong>50,000 VND</strong> for orders under 500,000 VND (suburban)</li>
      </ul>
      
      <h2>Shipping Partners</h2>
      <p>We partner with reputable shipping companies:</p>
      <ul>
        <li>Fast Delivery (GHN)</li>
        <li>Economical Delivery (GHTK)</li>
        <li>Viettel Post</li>
      </ul>
      
      <p>You can track your order via tracking code sent in confirmation email.</p>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800",
    slug: "van-chuyen",
    published: true,
  },
  {
    title: "Hướng dẫn chăm sóc và bảo quản sản phẩm",
    titleEn: "Product Care Guide",
    content: `
      <h2>Bảo quản sản phẩm lốp xe</h2>
      
      <h3>Điều kiện bảo quản</h3>
      <ul>
        <li>Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp</li>
        <li>Nhiệt độ từ 15-25°C</li>
        <li>Tránh tiếp xúc với hóa chất, dầu mỡ</li>
        <li>Để lốp ở tư thế đứng hoặc treo, không chất đè</li>
      </ul>
      
      <h3>Kiểm tra định kỳ</h3>
      <ul>
        <li><strong>Áp suất lốp:</strong> Kiểm tra mỗi tuần, đảm bảo đúng áp suất khuyến nghị</li>
        <li><strong>Độ mòn:</strong> Kiểm tra hàng tháng, thay lốp khi độ sâu rãnh < 1.6mm</li>
        <li><strong>Cân bằng lốp:</strong> Cân bằng lại sau mỗi 10.000km</li>
        <li><strong>Luân chuyển lốp:</strong> Thực hiện sau mỗi 5.000-8.000km</li>
      </ul>
      
      <h3>Mẹo kéo dài tuổi thọ lốp</h3>
      <ol>
        <li>Lái xe êm ái, tránh tăng tốc và phanh gấp</li>
        <li>Không quá tải trọng cho xe</li>
        <li>Tránh đường xấu, ổ gà sâu</li>
        <li>Kiểm tra góc đặt bánh xe định kỳ</li>
      </ol>
    `,
    contentEn: `
      <h2>Tire Product Care</h2>
      
      <h3>Storage Conditions</h3>
      <ul>
        <li>Dry, cool place, avoid direct sunlight</li>
        <li>Temperature 15-25°C</li>
        <li>Avoid contact with chemicals, grease</li>
        <li>Store tires upright or hanging, not stacked</li>
      </ul>
      
      <h3>Regular Inspection</h3>
      <ul>
        <li><strong>Tire Pressure:</strong> Check weekly, maintain recommended pressure</li>
        <li><strong>Wear:</strong> Check monthly, replace when tread depth < 1.6mm</li>
        <li><strong>Tire Balance:</strong> Rebalance every 10,000km</li>
        <li><strong>Tire Rotation:</strong> Perform every 5,000-8,000km</li>
      </ul>
      
      <h3>Tips to Extend Tire Life</h3>
      <ol>
        <li>Drive smoothly, avoid sudden acceleration and braking</li>
        <li>Don't overload vehicle</li>
        <li>Avoid bad roads, deep potholes</li>
        <li>Check wheel alignment regularly</li>
      </ol>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800",
    slug: "cham-soc-san-pham",
    published: true,
  },
];

async function seedSupportArticles() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing articles
    await SupportArticle.deleteMany({});
    console.log("🗑️  Cleared existing support articles");

    // Insert new articles
    const result = await SupportArticle.insertMany(supportArticles);
    console.log(`✅ Successfully seeded ${result.length} support articles`);

    console.log("\n📚 Seeded articles:");
    result.forEach((article) => {
      console.log(`  - ${article.title} (${article.slug})`);
    });

    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding support articles:", error);
    process.exit(1);
  }
}

seedSupportArticles();
