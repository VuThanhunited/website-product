const mongoose = require("mongoose");
const SupportArticle = require("./models/SupportArticle");
require("dotenv").config();

// Bản dịch cho support articles
const articleTranslations = {
  "Phương Thức Thanh Toán": {
    titleEn: "Payment Methods",
    contentEn:
      "<h2>Available Payment Methods</h2><p>We accept various payment methods for your convenience:</p><ul><li>Cash on Delivery (COD)</li><li>Bank Transfer</li><li>Credit/Debit Cards</li><li>E-wallets (Momo, ZaloPay, VNPay)</li></ul><p>All transactions are secure and protected.</p>",
  },
  "Chính Sách Đổi Trả": {
    titleEn: "Return & Exchange Policy",
    contentEn:
      "<h2>Return and Exchange Terms</h2><p>We offer a 7-day return and exchange policy for all products:</p><ul><li>Products must be unused and in original packaging</li><li>Receipt or proof of purchase required</li><li>Defective products will be replaced free of charge</li><li>Shipping costs for returns are covered by us for defective items</li></ul><p>Contact our customer service for assistance.</p>",
  },
  "Thông Tin Vận Chuyển": {
    titleEn: "Shipping Information",
    contentEn:
      "<h2>Delivery Service</h2><p>We provide fast and reliable shipping nationwide:</p><ul><li>Free shipping for orders over 500,000 VND</li><li>Delivery within 2-5 business days</li><li>Express delivery available in major cities</li><li>Order tracking available online</li></ul><p>We partner with trusted logistics companies to ensure safe delivery.</p>",
  },
  "Hướng Dẫn Đặt Hàng": {
    titleEn: "How to Order",
    contentEn:
      "<h2>Order Process</h2><p>Follow these simple steps to place your order:</p><ol><li>Browse our product catalog and select items</li><li>Add products to your shopping cart</li><li>Review your cart and proceed to checkout</li><li>Enter shipping information and select payment method</li><li>Confirm your order and receive confirmation email</li></ol><p>Our team will process your order within 24 hours.</p>",
  },
};

async function updateSupportArticleTranslations() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");

    // Lấy tất cả support articles
    const articles = await SupportArticle.find();
    console.log(`Found ${articles.length} support articles to update`);

    if (articles.length === 0) {
      console.log("No support articles found in database.");
      process.exit(0);
    }

    let updatedCount = 0;

    for (const article of articles) {
      const translation = articleTranslations[article.title];

      if (translation) {
        article.titleEn = translation.titleEn;
        article.contentEn = translation.contentEn;
        await article.save();
        updatedCount++;
        console.log(`✓ Updated: ${article.title}`);
      } else {
        console.log(`✗ No translation found for: ${article.title}`);
      }
    }

    console.log(
      `\n✅ Updated ${updatedCount} out of ${articles.length} support articles`
    );
    console.log("Support article translation update completed!");
    console.log(
      "\n📝 Note: Please add proper English translations to the script for better results."
    );

    process.exit(0);
  } catch (error) {
    console.error("Error updating support article translations:", error);
    process.exit(1);
  }
}

// Chạy script
updateSupportArticleTranslations();
