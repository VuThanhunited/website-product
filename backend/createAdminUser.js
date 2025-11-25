const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty";

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Danh sách admin users
    const admins = [
      {
        username: "admin",
        email: "admin@eft-company.com",
        password: "Admin@123456",
        role: "admin",
        isActive: true,
      },
      {
        username: "hoangphamha",
        email: "hoangphamha@gmail.com",
        password: "Admin@123456",
        role: "admin",
        isActive: true,
      },
    ];

    console.log("🔐 Tạo tài khoản admin...\n");

    for (const adminData of admins) {
      const existingAdmin = await User.findOne({ email: adminData.email });

      if (existingAdmin) {
        console.log("⚠️  Admin đã tồn tại:", adminData.email);
      } else {
        const admin = await User.create(adminData);
        console.log("✅ Tạo admin thành công!");
        console.log("   📧 Email:", admin.email);
        console.log("   🔑 Password:", adminData.password);
        console.log("   👤 Username:", admin.username);
        console.log("   🛡️  Role:", admin.role);
        console.log("");
      }
    }

    // Tạo test user
    const userData = {
      username: "testuser",
      email: "user@test.com",
      password: "User@123456",
      role: "user",
      isActive: true,
    };

    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      console.log("\n⚠️  Test user đã tồn tại!");
    } else {
      const user = await User.create(userData);
      console.log("\n✅ Tạo test user thành công!");
      console.log("📧 Email:", user.email);
      console.log("🔑 Password: User@123456");
      console.log("👤 Username:", user.username);
      console.log("🛡️  Role:", user.role);
    }

    console.log("\n🎉 Hoàn thành!");
    console.log("\n📝 Thông tin đăng nhập:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("ADMIN ACCOUNTS:");
    console.log("  1. Email: admin@eft-company.com");
    console.log("     Password: Admin@123456");
    console.log("\n  2. Email: hoangphamha@gmail.com");
    console.log("     Password: Admin@123456");
    console.log("\nUSER ACCOUNT:");
    console.log("  Email: user@test.com");
    console.log("  Password: User@123456");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

createAdminUser();
