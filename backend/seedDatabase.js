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
      companyName: "My E-Commerce Company",
      address: "123 Business Street, City, Country",
      phone: "+1 234 567 8900",
      email: "info@mycompany.com",
      about:
        "<h2>About Our Company</h2><p>We are a leading provider of quality products...</p>",
      socialLinks: {
        zalo: "https://zalo.me/yourcompany",
        youtube: "https://youtube.com/@yourcompany",
        instagram: "https://instagram.com/yourcompany",
        whatsapp: "1234567890",
      },
      topSectionBgColor: "#f0f0f0",
    });
    console.log("Created company info");

    // Create Categories
    const categories = await Category.create([
      {
        name: "Electronics",
        slug: "electronics",
        description: "Electronic devices and gadgets",
        order: 1,
      },
      {
        name: "Clothing",
        slug: "clothing",
        description: "Fashion and apparel",
        order: 2,
      },
      {
        name: "Home & Garden",
        slug: "home-garden",
        description: "Home improvement and garden supplies",
        order: 3,
      },
      {
        name: "Sports",
        slug: "sports",
        description: "Sports equipment and accessories",
        order: 4,
      },
    ]);
    console.log("Created categories");

    // Create Products
    const products = await Product.create([
      {
        name: "Wireless Headphones",
        slug: "wireless-headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        category: categories[0]._id,
        images: [
          "https://via.placeholder.com/400x400?text=Wireless+Headphones",
        ],
        featured: true,
        inStock: true,
        options: [{ name: "Color", values: ["Black", "White", "Blue"] }],
      },
      {
        name: "Smart Watch",
        slug: "smart-watch",
        description: "Feature-rich smartwatch with fitness tracking",
        price: 199.99,
        category: categories[0]._id,
        images: ["https://via.placeholder.com/400x400?text=Smart+Watch"],
        featured: true,
        inStock: true,
      },
      {
        name: "Cotton T-Shirt",
        slug: "cotton-tshirt",
        description: "Comfortable 100% cotton t-shirt",
        price: 19.99,
        category: categories[1]._id,
        images: ["https://via.placeholder.com/400x400?text=T-Shirt"],
        inStock: true,
        options: [
          { name: "Size", values: ["S", "M", "L", "XL"] },
          { name: "Color", values: ["Red", "Blue", "Green", "Black"] },
        ],
      },
      {
        name: "Denim Jeans",
        slug: "denim-jeans",
        description: "Classic denim jeans with modern fit",
        price: 49.99,
        category: categories[1]._id,
        images: ["https://via.placeholder.com/400x400?text=Jeans"],
        featured: true,
        inStock: true,
      },
      {
        name: "Garden Tools Set",
        slug: "garden-tools-set",
        description: "Complete set of essential garden tools",
        price: 79.99,
        category: categories[2]._id,
        images: ["https://via.placeholder.com/400x400?text=Garden+Tools"],
        inStock: true,
      },
      {
        name: "Yoga Mat",
        slug: "yoga-mat",
        description: "Non-slip yoga mat for comfortable practice",
        price: 29.99,
        category: categories[3]._id,
        images: ["https://via.placeholder.com/400x400?text=Yoga+Mat"],
        featured: true,
        inStock: true,
        options: [
          { name: "Color", values: ["Purple", "Blue", "Green", "Pink"] },
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
      { text: "Quality Products at Affordable Prices", order: 1, active: true },
      { text: "Fast Shipping Worldwide", order: 2, active: true },
      { text: "Customer Satisfaction Guaranteed", order: 3, active: true },
    ]);
    console.log("Created slogans");

    // Create Support Articles
    const articles = await SupportArticle.create([
      {
        title: "How to Place an Order",
        slug: "how-to-place-order",
        content:
          "<p>Follow these simple steps to place your order...</p><ol><li>Browse our products</li><li>Add items to cart</li><li>Proceed to checkout</li><li>Complete payment</li></ol>",
        thumbnail: "https://via.placeholder.com/300x200?text=Order+Guide",
        published: true,
      },
      {
        title: "Shipping Information",
        slug: "shipping-information",
        content:
          "<p>We offer various shipping options to meet your needs...</p><p>Standard shipping: 5-7 business days</p><p>Express shipping: 2-3 business days</p>",
        thumbnail: "https://via.placeholder.com/300x200?text=Shipping",
        published: true,
      },
      {
        title: "Return Policy",
        slug: "return-policy",
        content:
          "<p>We accept returns within 30 days of purchase...</p><p>Items must be unused and in original packaging.</p>",
        thumbnail: "https://via.placeholder.com/300x200?text=Returns",
        published: true,
      },
      {
        title: "Payment Methods",
        slug: "payment-methods",
        content:
          "<p>We accept the following payment methods:</p><ul><li>Credit Cards (Visa, MasterCard, Amex)</li><li>PayPal</li><li>Bank Transfer</li></ul>",
        thumbnail: "https://via.placeholder.com/300x200?text=Payments",
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
