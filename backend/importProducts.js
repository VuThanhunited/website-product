require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("./models/Product");
const Category = require("./models/Category");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB Connected");
  importProducts();
});

const importProducts = async () => {
  try {
    // Đọc file product.json
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "product.json"), "utf-8")
    );

    console.log("Deleting all old products...");
    await Product.deleteMany({});
    console.log("✅ Deleted all old products");

    console.log("Deleting old categories...");
    await Category.deleteMany({});
    console.log("✅ Deleted old categories");

    // Tạo các categories mới
    const categories = await Category.create([
      {
        name: "Dung dịch làm bóng",
        slug: "dung-dich-lam-bong",
        description: "Dung dịch làm bóng cao su và lốp xe",
        order: 1,
      },
      {
        name: "Dung dịch làm sạch",
        slug: "dung-dich-lam-sach",
        description: "Dung dịch làm sạch và vệ sinh ô tô",
        order: 2,
      },
      {
        name: "Nước làm mát động cơ",
        slug: "nuoc-lam-mat-dong-co",
        description: "Nước làm mát động cơ các loại",
        order: 3,
      },
      {
        name: "Nước rửa xe & kính",
        slug: "nuoc-rua-xe-kinh",
        description: "Nước rửa xe và nước rửa kính chuyên dụng",
        order: 4,
      },
    ]);

    console.log("✅ Created new categories:");
    categories.forEach((cat) => console.log(`   - ${cat.name}`));

    // Phân loại sản phẩm theo category
    const categoryMap = {
      "dung-dich-lam-bong": categories[0]._id,
      "dung-dich-lam-sach": categories[1]._id,
      "nuoc-lam-mat-dong-co": categories[2]._id,
      "nuoc-rua-xe-kinh": categories[3]._id,
    };

    // Import sản phẩm
    const products = [];
    for (const item of productsData) {
      // Chuyển đổi giá từ string sang number
      const priceString = item.price
        .replace(/\./g, "")
        .replace("VND", "")
        .trim();
      const price = parseInt(priceString);

      // Tạo slug từ tên sản phẩm
      const slug = item.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      // Xác định category dựa trên tên sản phẩm
      let categoryId;
      const nameLower = item.name.toLowerCase();
      if (nameLower.includes("làm bóng") || nameLower.includes("tyre shine")) {
        categoryId = categoryMap["dung-dich-lam-bong"];
      } else if (
        nameLower.includes("làm sạch") ||
        nameLower.includes("cleaner") ||
        nameLower.includes("vệ sinh")
      ) {
        categoryId = categoryMap["dung-dich-lam-sach"];
      } else if (nameLower.includes("làm mát") || nameLower.includes("gw")) {
        categoryId = categoryMap["nuoc-lam-mat-dong-co"];
      } else if (
        nameLower.includes("rửa kính") ||
        nameLower.includes("rửa xe") ||
        nameLower.includes("touchless")
      ) {
        categoryId = categoryMap["nuoc-rua-xe-kinh"];
      } else {
        categoryId = categoryMap["dung-dich-lam-sach"]; // Default
      }

      products.push({
        name: item.name,
        slug: slug,
        description:
          item.description || "Sản phẩm chăm sóc ô tô chất lượng cao từ Kuiper",
        price: price,
        category: categoryId,
        images: [item.image],
        inStock: true,
        featured: price >= 500000, // Sản phẩm giá >= 500k là featured
      });
    }

    // Thêm sản phẩm vào database
    const createdProducts = await Product.insertMany(products);
    console.log(
      `\n✅ Successfully imported ${createdProducts.length} products!`
    );

    // Hiển thị thông tin sản phẩm đã import theo category
    console.log("\n📦 Imported products by category:");
    for (const category of categories) {
      const categoryProducts = createdProducts.filter(
        (p) => p.category.toString() === category._id.toString()
      );
      console.log(`\n${category.name} (${categoryProducts.length} sản phẩm):`);
      categoryProducts.forEach((product, index) => {
        console.log(
          `   ${index + 1}. ${product.name} - ${product.price.toLocaleString(
            "vi-VN"
          )} VNĐ ${product.featured ? "⭐" : ""}`
        );
      });
    }

    process.exit(0);
  } catch (error) {
    console.error("Error importing products:", error);
    process.exit(1);
  }
};
