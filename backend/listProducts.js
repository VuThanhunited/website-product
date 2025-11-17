const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGODB_URI =
  "mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty";

async function listProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    const products = await Product.find({});

    console.log(`Found ${products.length} products:\n`);

    products.forEach((product, index) => {
      console.log(`${index + 1}. "${product.name}"`);
      console.log(`   Current image: ${product.images[0] || "NO IMAGE"}`);
      console.log(`   ID: ${product._id}\n`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
}

listProducts();
