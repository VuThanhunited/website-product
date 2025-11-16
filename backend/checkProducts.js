const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const Category = require("./models/Category");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const checkProducts = async () => {
  try {
    const products = await Product.find().populate("category");
    console.log(`\n📦 Total products in database: ${products.length}\n`);

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Price: ${product.price.toLocaleString("vi-VN")} đ`);
      console.log(`   Category: ${product.category?.name || "N/A"}`);
      console.log(`   Featured: ${product.featured ? "Yes" : "No"}`);
      console.log(`   Slug: ${product.slug}`);
      console.log("");
    });

    const categories = await Category.find();
    console.log(`\n📂 Total categories: ${categories.length}`);
    categories.forEach((cat) => {
      console.log(`   - ${cat.name} (${cat.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkProducts();
