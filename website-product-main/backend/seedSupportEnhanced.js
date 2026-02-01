const mongoose = require("mongoose");
const SupportArticle = require("./models/SupportArticle");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const supportArticles = [
  {
    title: "Hướng dẫn đặt hàng trực tuyến",
    titleEn: "Online Ordering Guide",
    content: `
      <h2>📱 Hướng dẫn đặt hàng từng bước</h2>
      
      <div class="step-guide">
        <h3>Bước 1: Chọn sản phẩm</h3>
        <p>Duyệt qua danh mục sản phẩm và chọn sản phẩm bạn muốn mua. Bạn có thể:</p>
        <ul>
          <li>✓ Tìm kiếm theo tên sản phẩm, mã sản phẩm</li>
          <li>✓ Lọc theo danh mục, thương hiệu</li>
          <li>✓ Xem chi tiết thông số kỹ thuật</li>
          <li>✓ So sánh giá giữa các sản phẩm tương tự</li>
        </ul>
        
        <h3>Bước 2: Thêm vào giỏ hàng</h3>
        <p>Nhấn nút <strong>"Thêm vào giỏ hàng"</strong> màu xanh trên trang sản phẩm. Bạn sẽ thấy thông báo xác nhận và số lượng sản phẩm trong giỏ hàng tăng lên.</p>
        
        <h3>Bước 3: Kiểm tra giỏ hàng</h3>
        <p>Nhấn vào biểu tượng giỏ hàng ở góc trên bên phải màn hình để xem:</p>
        <ul>
          <li>Danh sách sản phẩm đã chọn với hình ảnh</li>
          <li>Số lượng từng sản phẩm (có thể điều chỉnh tăng/giảm)</li>
          <li>Giá từng món và tổng giá trị tạm tính</li>
          <li>Phí vận chuyển dự kiến theo khu vực</li>
        </ul>
        
        <h3>Bước 4: Điền thông tin giao hàng</h3>
        <p>Nhập chính xác các thông tin sau:</p>
        <ul>
          <li><strong>Họ và tên:</strong> Người nhận hàng</li>
          <li><strong>Số điện thoại:</strong> Liên hệ khi giao hàng</li>
          <li><strong>Email:</strong> Nhận thông tin đơn hàng, hóa đơn điện tử</li>
          <li><strong>Địa chỉ:</strong> Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố</li>
          <li><strong>Ghi chú:</strong> Yêu cầu đặc biệt về thời gian giao hàng</li>
        </ul>
        
        <h3>Bước 5: Chọn phương thức thanh toán</h3>
        <p>Chúng tôi hỗ trợ 3 phương thức an toàn:</p>
        <table style="width:100%; border-collapse: collapse;">
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; border: 1px solid #ddd;">Phương thức</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Ưu điểm</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Phí</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>COD</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Thanh toán khi nhận hàng, an toàn nhất</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Miễn phí</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Chuyển khoản</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Được giảm 2% phí COD</td>
            <td style="padding: 10px; border: 1px solid #ddd;">-2% giảm giá</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>MoMo</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Nhanh chóng, có khuyến mãi từ MoMo</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Miễn phí</td>
          </tr>
        </table>
        
        <h3>Bước 6: Xác nhận và hoàn tất đơn hàng</h3>
        <p>Kiểm tra kỹ lại toàn bộ thông tin và nhấn nút <strong>"Đặt hàng"</strong>. Sau khi đặt hàng thành công, bạn sẽ nhận được:</p>
        <ul>
          <li>✉️ Mã đơn hàng hiển thị ngay trên màn hình</li>
          <li>📧 Email xác nhận trong vòng 5 phút</li>
          <li>📞 Cuộc gọi xác nhận từ nhân viên trong 2-4 giờ làm việc</li>
          <li>📱 SMS cập nhật tình trạng đơn hàng</li>
        </ul>
      </div>
      
      <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <h3>⚠️ Lưu ý quan trọng</h3>
        <ul>
          <li>Vui lòng điền <strong>chính xác số điện thoại</strong> để nhận được cuộc gọi xác nhận</li>
          <li>Kiểm tra email (cả thư mục spam/junk) để nhận thông tin chi tiết</li>
          <li>Đơn hàng có thể được <strong>chỉnh sửa miễn phí</strong> trong vòng 1 giờ sau khi đặt</li>
          <li>Liên hệ hotline <strong>1900-xxxx</strong> (8h-22h hàng ngày) nếu cần hỗ trợ khẩn cấp</li>
          <li>Thời gian xử lý đơn hàng: 2-4 giờ vào giờ hành chính</li>
        </ul>
      </div>
      
      <div style="background: #d1ecf1; padding: 15px; border-left: 4px solid #17a2b8; margin: 20px 0;">
        <h3>💡 Mẹo đặt hàng hiệu quả</h3>
        <ul>
          <li>Đặt hàng trước 15h để được giao trong ngày (khu vực nội thành)</li>
          <li>Kiểm tra chương trình khuyến mãi trước khi thanh toán</li>
          <li>Mua nhiều sản phẩm cùng lúc để tiết kiệm phí vận chuyển</li>
          <li>Lưu thông tin tài khoản để đặt hàng nhanh hơn lần sau</li>
        </ul>
      </div>
    `,
    contentEn: `
      <h2>📱 Step-by-Step Ordering Guide</h2>
      
      <div class="step-guide">
        <h3>Step 1: Select Products</h3>
        <p>Browse product categories and choose items you want to buy. You can:</p>
        <ul>
          <li>✓ Search by product name, SKU</li>
          <li>✓ Filter by category, brand</li>
          <li>✓ View detailed specifications</li>
          <li>✓ Compare prices between similar products</li>
        </ul>
        
        <h3>Step 2: Add to Cart</h3>
        <p>Click the blue <strong>"Add to Cart"</strong> button on product page. You'll see confirmation notification and cart quantity increases.</p>
        
        <h3>Step 3: Review Cart</h3>
        <p>Click cart icon in top right corner to view:</p>
        <ul>
          <li>List of selected products with images</li>
          <li>Quantity of each product (adjustable)</li>
          <li>Individual prices and subtotal</li>
          <li>Estimated shipping fee by region</li>
        </ul>
        
        <h3>Step 4: Fill Delivery Information</h3>
        <p>Enter accurate information:</p>
        <ul>
          <li><strong>Full Name:</strong> Recipient name</li>
          <li><strong>Phone:</strong> Contact for delivery</li>
          <li><strong>Email:</strong> Receive order info, e-invoice</li>
          <li><strong>Address:</strong> House number, street, ward, district, city/province</li>
          <li><strong>Notes:</strong> Special delivery time requests</li>
        </ul>
        
        <h3>Step 5: Select Payment Method</h3>
        <p>We support 3 secure methods:</p>
        <table style="width:100%; border-collapse: collapse;">
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; border: 1px solid #ddd;">Method</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Benefits</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Fee</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>COD</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Pay on delivery, safest</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Free</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Bank Transfer</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Get 2% COD fee discount</td>
            <td style="padding: 10px; border: 1px solid #ddd;">-2% discount</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>MoMo</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Fast with MoMo promotions</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Free</td>
          </tr>
        </table>
        
        <h3>Step 6: Confirm Order</h3>
        <p>Review all information and click <strong>"Place Order"</strong> button. After successful order, you will receive:</p>
        <ul>
          <li>✉️ Order code displayed immediately</li>
          <li>📧 Confirmation email within 5 minutes</li>
          <li>📞 Confirmation call from staff within 2-4 business hours</li>
          <li>📱 SMS updates on order status</li>
        </ul>
      </div>
      
      <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <h3>⚠️ Important Notes</h3>
        <ul>
          <li>Please enter <strong>correct phone number</strong> to receive confirmation call</li>
          <li>Check email (including spam folder) for detailed information</li>
          <li>Order can be <strong>edited free</strong> within 1 hour after placing</li>
          <li>Contact hotline <strong>1900-xxxx</strong> (8am-10pm daily) for urgent support</li>
          <li>Order processing time: 2-4 hours during business hours</li>
        </ul>
      </div>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&q=80",
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/9bZkp7q19f0",
    ],
    attachments: [
      {
        filename: "Huong-dan-dat-hang-chi-tiet.pdf",
        filepath: "/files/ordering-guide.pdf",
        filesize: 2458000,
      },
      {
        filename: "Mau-don-hang.xlsx",
        filepath: "/files/order-template.xlsx",
        filesize: 156000,
      },
      {
        filename: "Checklist-truoc-khi-dat-hang.docx",
        filepath: "/files/order-checklist.docx",
        filesize: 89000,
      },
    ],
    slug: "huong-dan-dat-hang",
    published: true,
  },
  {
    title: "Chính sách đổi trả hàng",
    titleEn: "Return & Exchange Policy",
    content: `
      <h2>🔄 Chính sách đổi trả toàn diện</h2>
      
      <div style="background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
        <h3>✅ Cam kết của chúng tôi</h3>
        <p><strong>Đổi trả miễn phí trong 7 ngày</strong> - Chúng tôi cam kết mang đến trải nghiệm mua sắm an tâm nhất cho khách hàng!</p>
      </div>
      
      <h3>📋 Điều kiện đổi trả được chấp nhận</h3>
      <p>Sản phẩm được đổi trả khi thỏa mãn <strong>ÍT NHẤT MỘT</strong> trong các điều kiện sau:</p>
      <ul>
        <li>✓ Sản phẩm <strong>còn nguyên tem mác, bao bì</strong>, chưa qua sử dụng</li>
        <li>✓ Sản phẩm bị <strong>lỗi kỹ thuật do nhà sản xuất</strong></li>
        <li>✓ Giao <strong>sai sản phẩm, sai mẫu mã, sai màu sắc</strong></li>
        <li>✓ <strong>Thiếu hàng, thiếu phụ kiện</strong> so với đơn hàng</li>
        <li>✓ Sản phẩm <strong>không đúng như mô tả</strong> trên website</li>
        <li>✓ Sản phẩm bị <strong>hư hỏng trong quá trình vận chuyển</strong></li>
        <li>✓ Khách hàng <strong>không hài lòng về chất lượng</strong> (áp dụng trong 3 ngày đầu)</li>
      </ul>
      
      <h3>🚫 Các trường hợp KHÔNG được đổi trả</h3>
      <ul>
        <li>✗ Sản phẩm đã qua sử dụng, có dấu hiệu bẩn, trầy xước</li>
        <li>✗ Sản phẩm đã bóc tem, cắt mác, mất bao bì nguyên vẹn</li>
        <li>✗ Quá thời hạn 7 ngày kể từ ngày nhận hàng</li>
        <li>✗ Sản phẩm thuộc chương trình giảm giá đặc biệt (có ghi chú riêng)</li>
        <li>✗ Không có hóa đơn hoặc chứng từ mua hàng</li>
      </ul>
      
      <h3>📝 Quy trình đổi trả từng bước</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Bước 1: Thông báo đổi trả</strong></p>
        <ul>
          <li>Liên hệ hotline: <strong>1900-xxxx</strong> (8h-22h hàng ngày)</li>
          <li>Hoặc email: <strong>support@example.com</strong></li>
          <li>Hoặc chat trực tuyến trên website</li>
          <li>Cung cấp: Mã đơn hàng, lý do đổi trả, hình ảnh sản phẩm</li>
        </ul>
        
        <p><strong>Bước 2: Đóng gói sản phẩm</strong></p>
        <ul>
          <li>Sản phẩm để trong bao bì nguyên vẹn</li>
          <li>Kèm theo hóa đơn, phiếu bảo hành (nếu có)</li>
          <li>Ghi rõ mã đơn hàng và lý do đổi trả</li>
        </ul>
        
        <p><strong>Bước 3: Gửi hàng trả lại</strong></p>
        <ul>
          <li>Chúng tôi sẽ cử nhân viên đến <strong>lấy hàng tận nơi MIỄN PHÍ</strong></li>
          <li>Hoặc bạn có thể gửi về địa chỉ: <strong>123 Nguyễn Văn A, Quận 1, TP.HCM</strong></li>
          <li>Phí vận chuyển: <strong>Chúng tôi thanh toán 100%</strong> nếu lỗi từ phía shop</li>
        </ul>
        
        <p><strong>Bước 4: Kiểm tra và xử lý</strong></p>
        <ul>
          <li>Thời gian kiểm tra: <strong>2-3 ngày làm việc</strong></li>
          <li>Thông báo kết quả qua điện thoại và email</li>
          <li>Nếu đủ điều kiện → Xử lý đổi/trả theo yêu cầu</li>
        </ul>
        
        <p><strong>Bước 5: Hoàn tất</strong></p>
        <ul>
          <li><strong>Đổi sản phẩm mới:</strong> Giao trong 2-3 ngày</li>
          <li><strong>Hoàn tiền:</strong> Chuyển khoản trong 3-5 ngày làm việc</li>
          <li><strong>Hoàn xu:</strong> Cộng vào tài khoản để mua hàng tiếp</li>
        </ul>
      </div>
      
      <h3>💰 Chính sách hoàn tiền</h3>
      <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f5f5f5;">
          <th style="padding: 10px; border: 1px solid #ddd;">Trường hợp</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Hình thức hoàn</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Thời gian</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Lỗi từ shop</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Hoàn 100% + phí ship</td>
          <td style="padding: 10px; border: 1px solid #ddd;">3-5 ngày</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Khách đổi ý</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Hoàn 100% (trừ phí ship)</td>
          <td style="padding: 10px; border: 1px solid #ddd;">3-5 ngày</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Lỗi vận chuyển</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Hoàn 100% + đền bù</td>
          <td style="padding: 10px; border: 1px solid #ddd;">5-7 ngày</td>
        </tr>
      </table>
      
      <div style="background: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
        <h3>💡 Lưu ý quan trọng</h3>
        <ul>
          <li><strong>Bảo quản hóa đơn:</strong> Luôn giữ hóa đơn để thuận tiện khi đổi trả</li>
          <li><strong>Chụp ảnh khi nhận hàng:</strong> Để làm bằng chứng nếu có vấn đề</li>
          <li><strong>Kiểm tra ngay:</strong> Kiểm tra sản phẩm ngay khi nhận để phát hiện lỗi sớm</li>
          <li><strong>Liên hệ sớm:</strong> Thông báo đổi trả càng sớm càng được xử lý nhanh</li>
        </ul>
      </div>
      
      <h3>📞 Liên hệ hỗ trợ</h3>
      <p>Bạn gặp vấn đề với đơn hàng? Chúng tôi luôn sẵn sàng hỗ trợ!</p>
      <ul>
        <li>☎️ Hotline: <strong>1900-xxxx</strong> (8h-22h hàng ngày)</li>
        <li>📧 Email: <strong>support@example.com</strong></li>
        <li>💬 Chat: Góc dưới bên phải website</li>
        <li>📱 Zalo OA: <strong>@shopname</strong></li>
      </ul>
    `,
    contentEn: `
      <h2>🔄 Comprehensive Return & Exchange Policy</h2>
      
      <div style="background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
        <h3>✅ Our Commitment</h3>
        <p><strong>Free returns within 7 days</strong> - We are committed to providing the most secure shopping experience!</p>
      </div>
      
      <h3>📋 Acceptable Return Conditions</h3>
      <p>Products are eligible for return when meeting <strong>AT LEAST ONE</strong> of these conditions:</p>
      <ul>
        <li>✓ Product has <strong>original tags, packaging</strong>, unused</li>
        <li>✓ Product has <strong>manufacturing defects</strong></li>
        <li>✓ Delivered <strong>wrong product, wrong model, wrong color</strong></li>
        <li>✓ <strong>Missing items or accessories</strong> from order</li>
        <li>✓ Product <strong>doesn't match description</strong> on website</li>
        <li>✓ Product <strong>damaged during shipping</strong></li>
        <li>✓ Customer <strong>not satisfied with quality</strong> (within first 3 days)</li>
      </ul>
      
      <h3>🚫 Non-returnable Cases</h3>
      <ul>
        <li>✗ Used products, with signs of dirt or scratches</li>
        <li>✗ Products with removed tags, cut labels, damaged packaging</li>
        <li>✗ Past 7-day period from delivery date</li>
        <li>✗ Products in special clearance sales (with specific notes)</li>
        <li>✗ No invoice or purchase proof</li>
      </ul>
      
      <h3>📝 Step-by-Step Return Process</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Step 1: Notify Return</strong></p>
        <ul>
          <li>Contact hotline: <strong>1900-xxxx</strong> (8am-10pm daily)</li>
          <li>Or email: <strong>support@example.com</strong></li>
          <li>Or live chat on website</li>
          <li>Provide: Order code, return reason, product photos</li>
        </ul>
        
        <p><strong>Step 2: Package Product</strong></p>
        <ul>
          <li>Keep product in original packaging</li>
          <li>Include invoice, warranty card (if any)</li>
          <li>Note order code and return reason</li>
        </ul>
        
        <p><strong>Step 3: Send Return</strong></p>
        <ul>
          <li>We will arrange <strong>FREE pickup at your location</strong></li>
          <li>Or send to address: <strong>123 Nguyen Van A, District 1, HCMC</strong></li>
          <li>Shipping fee: <strong>We cover 100%</strong> if fault from our side</li>
        </ul>
        
        <p><strong>Step 4: Inspection & Processing</strong></p>
        <ul>
          <li>Inspection time: <strong>2-3 business days</strong></li>
          <li>Results notification via phone and email</li>
          <li>If eligible → Process exchange/refund as requested</li>
        </ul>
        
        <p><strong>Step 5: Completion</strong></p>
        <ul>
          <li><strong>Exchange new product:</strong> Delivery in 2-3 days</li>
          <li><strong>Refund:</strong> Bank transfer in 3-5 business days</li>
          <li><strong>Store credit:</strong> Added to account for future purchase</li>
        </ul>
      </div>
      
      <h3>💰 Refund Policy</h3>
      <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f5f5f5;">
          <th style="padding: 10px; border: 1px solid #ddd;">Case</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Refund Type</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Timeline</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Our fault</td>
          <td style="padding: 10px; border: 1px solid #ddd;">100% + shipping fee</td>
          <td style="padding: 10px; border: 1px solid #ddd;">3-5 days</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Customer changed mind</td>
          <td style="padding: 10px; border: 1px solid #ddd;">100% (minus shipping)</td>
          <td style="padding: 10px; border: 1px solid #ddd;">3-5 days</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Shipping damage</td>
          <td style="padding: 10px; border: 1px solid #ddd;">100% + compensation</td>
          <td style="padding: 10px; border: 1px solid #ddd;">5-7 days</td>
        </tr>
      </table>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    ],
    videos: ["https://www.youtube.com/embed/example-return-guide"],
    attachments: [
      {
        filename: "Mau-phieu-doi-tra.pdf",
        filepath: "/files/return-form.pdf",
        filesize: 245000,
      },
      {
        filename: "Chinh-sach-doi-tra-day-du.pdf",
        filepath: "/files/return-policy-full.pdf",
        filesize: 1250000,
      },
      {
        filename: "Huong-dan-dong-goi-tra-hang.docx",
        filepath: "/files/packing-guide.docx",
        filesize: 450000,
      },
    ],
    slug: "chinh-sach-doi-tra",
    published: true,
  },
  {
    title: "Hướng dẫn bảo quản lốp xe",
    titleEn: "Tire Care Guide",
    content: `
      <h2>🛞 Hướng dẫn chăm sóc và bảo quản lốp xe toàn diện</h2>
      
      <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <h3>⚡ Tại sao cần bảo quản lốp xe đúng cách?</h3>
        <p>Lốp xe được bảo quản tốt có thể:</p>
        <ul>
          <li>✓ Tăng tuổi thọ lốp lên đến <strong>30-50%</strong></li>
          <li>✓ Tiết kiệm nhiên liệu <strong>5-10%</strong></li>
          <li>✓ Đảm bảo an toàn khi lái xe</li>
          <li>✓ Giảm chi phí sửa chữa và thay thế</li>
        </ul>
      </div>
      
      <h3>📦 Điều kiện bảo quản lốp tối ưu</h3>
      <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f5f5f5;">
          <th style="padding: 10px; border: 1px solid #ddd;">Yếu tố</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Yêu cầu</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Lưu ý</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Nhiệt độ</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">15-25°C</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Tránh nơi quá nóng hoặc quá lạnh</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Độ ẩm</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">40-60%</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Nơi khô ráo, thoáng mát</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Ánh sáng</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">Tránh ánh sáng trực tiếp</td>
          <td style="padding: 10px; border: 1px solid #ddd;">UV làm lão hóa cao su</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Vị trí</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">Đứng thẳng hoặc treo</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Không chồng chất quá 4 lốp</td>
        </tr>
      </table>
      
      <h3>🔧 Bảo dưỡng định kỳ</h3>
      
      <h4>📅 Hàng tuần</h4>
      <ul>
        <li><strong>Kiểm tra áp suất lốp:</strong>
          <ul>
            <li>Dùng đồng hồ đo áp suất chuyên dụng</li>
            <li>Đo khi lốp nguội (trước khi chạy hoặc sau 3h dừng xe)</li>
            <li>Áp suất chuẩn: Xem nhãn dán trên cột xe hoặc cửa xe</li>
            <li>Không quên kiểm tra lốp dự phòng</li>
          </ul>
        </li>
        <li><strong>Quan sát bề mặt lốp:</strong> Kiểm tra xem có vật lạ, đá sỏi, đinh vít hay không</li>
      </ul>
      
      <h4>📅 Hàng tháng</h4>
      <ul>
        <li><strong>Đo độ mòn gai lốp:</strong>
          <ul>
            <li>Dùng thước đo độ sâu rãnh lốp</li>
            <li>Độ sâu tối thiểu: <strong>1.6mm</strong></li>
            <li>Khuyến nghị thay lốp khi còn: <strong>3mm</strong></li>
            <li>Kiểm tra độ mòn đều ở nhiều vị trí</li>
          </ul>
        </li>
        <li><strong>Kiểm tra vệ sinh lốp:</strong> Rửa lốp, loại bỏ bùn đất và hóa chất</li>
      </ul>
      
      <h4>📅 Mỗi 5.000 - 8.000 km</h4>
      <ul>
        <li><strong>Luân chuyển lốp (Tire Rotation):</strong>
          <ul>
            <li>Giúp lốp mòn đều hơn</li>
            <li>Tăng tuổi thọ lốp 20-30%</li>
            <li>Chi phí: Khoảng 100.000 - 200.000đ</li>
            <li>Thời gian: 20-30 phút</li>
          </ul>
        </li>
      </ul>
      
      <h4>📅 Mỗi 10.000 km hoặc 6 tháng</h4>
      <ul>
        <li><strong>Cân bằng lốp (Wheel Balancing):</strong>
          <ul>
            <li>Giảm rung, giảm tiếng ồn</li>
            <li>Bảo vệ hệ thống treo</li>
            <li>Chi phí: Khoảng 50.000đ/bánh</li>
          </ul>
        </li>
        <li><strong>Căn chỉnh góc đặt bánh xe (Wheel Alignment):</strong>
          <ul>
            <li>Đảm bảo xe chạy thẳng</li>
            <li>Giảm mòn lốp bất thường</li>
            <li>Chi phí: Khoảng 200.000 - 400.000đ</li>
          </ul>
        </li>
      </ul>
      
      <h3>💡 Mẹo kéo dài tuổi thọ lốp</h3>
      <div style="background: #d1ecf1; padding: 15px; border-left: 4px solid #17a2b8; margin: 20px 0;">
        <ol>
          <li><strong>Lái xe êm ái:</strong>
            <ul>
              <li>Tránh tăng tốc đột ngột</li>
              <li>Phanh từ từ, dự đoán tình huống</li>
              <li>Không vào cua gấp với tốc độ cao</li>
            </ul>
          </li>
          <li><strong>Tải trọng hợp lý:</strong>
            <ul>
              <li>Không chở quá tải trọng cho phép</li>
              <li>Phân bổ hàng hóa đều trên xe</li>
              <li>Xem thông số tải trọng tối đa trên thành lốp</li>
            </ul>
          </li>
          <li><strong>Chọn đường đi:</strong>
            <ul>
              <li>Tránh đường xấu, ổ gà sâu</li>
              <li>Không đi qua vệt dầu, hóa chất</li>
              <li>Tránh đỗ xe sát lề đá, kề</li>
            </ul>
          </li>
          <li><strong>Bảo vệ khỏi tác động môi trường:</strong>
            <ul>
              <li>Đậu xe trong nhà hoặc nơi có mái che</li>
              <li>Sử dụng bạt phủ nếu để xe lâu ngày</li>
              <li>Tránh để xe gần nguồn nhiệt hoặc hóa chất</li>
            </ul>
          </li>
        </ol>
      </div>
      
      <h3>⚠️ Dấu hiệu cần thay lốp ngay</h3>
      <div style="background: #f8d7da; padding: 15px; border-left: 4px solid #dc3545; margin: 20px 0;">
        <ul>
          <li>🔴 Độ sâu gai lốp < 1.6mm</li>
          <li>🔴 Lốp bị nứt, rạn nứt nghiêm trọng</li>
          <li>🔴 Thành lốp bị phồng rộp</li>
          <li>🔴 Lốp mòn không đều (1 bên mòn hơn)</li>
          <li>🔴 Lốp đã sử dụng trên 5 năm (kể cả ít chạy)</li>
          <li>🔴 Xe rung bất thường khi chạy</li>
          <li>🔴 Lốp bị đâm, cắt xuyên qua lớp thép</li>
          <li>🔴 Xe bị chệch hướng khi chạy thẳng</li>
        </ul>
      </div>
      
      <h3>📚 Tài liệu tham khảo</h3>
      <p>Download các tài liệu hướng dẫn chi tiết bên dưới để tham khảo thêm!</p>
    `,
    contentEn: `
      <h2>🛞 Comprehensive Tire Care Guide</h2>
      
      <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <h3>⚡ Why proper tire maintenance matters?</h3>
        <p>Well-maintained tires can:</p>
        <ul>
          <li>✓ Increase tire life by <strong>30-50%</strong></li>
          <li>✓ Save fuel <strong>5-10%</strong></li>
          <li>✓ Ensure driving safety</li>
          <li>✓ Reduce repair and replacement costs</li>
        </ul>
      </div>
      
      <h3>📦 Optimal Tire Storage Conditions</h3>
      <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f5f5f5;">
          <th style="padding: 10px; border: 1px solid #ddd;">Factor</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Requirement</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Notes</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Temperature</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">15-25°C</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Avoid extreme heat or cold</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Humidity</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">40-60%</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Dry, well-ventilated place</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Light</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">Avoid direct sunlight</td>
          <td style="padding: 10px; border: 1px solid #ddd;">UV ages rubber</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Position</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">Upright or hanging</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Don't stack more than 4 tires</td>
        </tr>
      </table>
      
      <h3>🔧 Regular Maintenance Schedule</h3>
      
      <h4>📅 Weekly</h4>
      <ul>
        <li><strong>Check tire pressure:</strong>
          <ul>
            <li>Use specialized pressure gauge</li>
            <li>Measure when cold (before driving or 3h after)</li>
            <li>Standard pressure: Check sticker on door jamb</li>
            <li>Don't forget spare tire</li>
          </ul>
        </li>
        <li><strong>Inspect tire surface:</strong> Check for foreign objects, stones, nails</li>
      </ul>
      
      <h4>📅 Monthly</h4>
      <ul>
        <li><strong>Measure tread depth:</strong>
          <ul>
            <li>Use tread depth gauge</li>
            <li>Minimum depth: <strong>1.6mm</strong></li>
            <li>Recommend replacement at: <strong>3mm</strong></li>
            <li>Check even wear at multiple points</li>
          </ul>
        </li>
        <li><strong>Clean tires:</strong> Wash tires, remove mud and chemicals</li>
      </ul>
      
      <h4>📅 Every 5,000 - 8,000 km</h4>
      <ul>
        <li><strong>Tire Rotation:</strong>
          <ul>
            <li>Promotes even wear</li>
            <li>Increases tire life 20-30%</li>
            <li>Cost: About $10-20</li>
            <li>Time: 20-30 minutes</li>
          </ul>
        </li>
      </ul>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80",
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    ],
    videos: [
      "https://www.youtube.com/embed/tire-care-tutorial",
      "https://www.youtube.com/embed/tire-rotation-guide",
    ],
    attachments: [
      {
        filename: "Lich-bao-duong-lop-xe.pdf",
        filepath: "/files/tire-maintenance-schedule.pdf",
        filesize: 856000,
      },
      {
        filename: "Bang-ap-suat-lop-theo-xe.xlsx",
        filepath: "/files/tire-pressure-chart.xlsx",
        filesize: 234000,
      },
      {
        filename: "Huong-dan-kiem-tra-lop-xe.pdf",
        filepath: "/files/tire-inspection-guide.pdf",
        filesize: 1890000,
      },
      {
        filename: "Video-huong-dan-bao-duong.mp4",
        filepath: "/files/tire-care-video.mp4",
        filesize: 45600000,
      },
    ],
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
      console.log(
        `    └─ Images: ${article.images?.length || 0}, Videos: ${
          article.videos?.length || 0
        }, Files: ${article.attachments?.length || 0}`
      );
    });

    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding support articles:", error);
    process.exit(1);
  }
}

seedSupportArticles();
