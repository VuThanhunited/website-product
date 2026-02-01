const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ShippingRate = require("./models/ShippingRate");

dotenv.config();

// Danh sách 34 tỉnh thành Việt Nam theo Nghị quyết sắp xếp ĐVHC năm 2025
const shippingRates = [
  // 6 Thành phố trực thuộc trung ương
  { province: "Hà Nội", rate: 20000, estimatedDays: "1-2 ngày" },
  { province: "Thành phố Hồ Chí Minh", rate: 25000, estimatedDays: "2-3 ngày" },
  { province: "Đà Nẵng", rate: 30000, estimatedDays: "2-3 ngày" },
  { province: "Hải Phòng", rate: 25000, estimatedDays: "1-2 ngày" },
  { province: "Cần Thơ", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Huế", rate: 35000, estimatedDays: "3-4 ngày" },

  // 28 Tỉnh
  { province: "An Giang", rate: 40000, estimatedDays: "4-5 ngày" },
  { province: "Bà Rịa - Vũng Tàu", rate: 30000, estimatedDays: "2-3 ngày" },
  { province: "Bạc Liêu", rate: 45000, estimatedDays: "4-5 ngày" },
  { province: "Bắc Kạn", rate: 40000, estimatedDays: "3-4 ngày" },
  { province: "Bắc Ninh", rate: 22000, estimatedDays: "1-2 ngày" },
  { province: "Bến Tre", rate: 38000, estimatedDays: "3-4 ngày" },
  { province: "Bình Định", rate: 40000, estimatedDays: "4-5 ngày" },
  { province: "Bình Dương", rate: 27000, estimatedDays: "2-3 ngày" },
  { province: "Bình Phước", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Bình Thuận", rate: 42000, estimatedDays: "4-5 ngày" },
  { province: "Cà Mau", rate: 50000, estimatedDays: "5-6 ngày" },
  { province: "Cao Bằng", rate: 45000, estimatedDays: "4-5 ngày" },
  { province: "Đắk Lắk", rate: 43000, estimatedDays: "4-5 ngày" },
  { province: "Đồng Nai", rate: 28000, estimatedDays: "2-3 ngày" },
  { province: "Đồng Tháp", rate: 40000, estimatedDays: "4-5 ngày" },
  { province: "Gia Lai", rate: 45000, estimatedDays: "4-5 ngày" },
  { province: "Hà Giang", rate: 50000, estimatedDays: "5-6 ngày" },
  { province: "Hà Tĩnh", rate: 38000, estimatedDays: "3-4 ngày" },
  { province: "Hòa Bình", rate: 35000, estimatedDays: "2-3 ngày" },
  { province: "Hưng Yên", rate: 24000, estimatedDays: "1-2 ngày" },
  { province: "Khánh Hòa", rate: 38000, estimatedDays: "3-4 ngày" },
  { province: "Kiên Giang", rate: 45000, estimatedDays: "4-5 ngày" },
  { province: "Kon Tum", rate: 48000, estimatedDays: "5-6 ngày" },
  { province: "Lai Châu", rate: 52000, estimatedDays: "5-6 ngày" },
  { province: "Lâm Đồng", rate: 40000, estimatedDays: "4-5 ngày" },
  { province: "Lào Cai", rate: 48000, estimatedDays: "4-5 ngày" },
  { province: "Long An", rate: 32000, estimatedDays: "3-4 ngày" },
  { province: "Nam Định", rate: 28000, estimatedDays: "2-3 ngày" },
  { province: "Nghệ An", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Ninh Bình", rate: 30000, estimatedDays: "2-3 ngày" },
  { province: "Phú Thọ", rate: 32000, estimatedDays: "2-3 ngày" },
  { province: "Phú Yên", rate: 42000, estimatedDays: "4-5 ngày" },
  { province: "Quảng Bình", rate: 38000, estimatedDays: "3-4 ngày" },
  { province: "Quảng Nam", rate: 37000, estimatedDays: "3-4 ngày" },
  { province: "Quảng Ninh", rate: 30000, estimatedDays: "2-3 ngày" },
  { province: "Quảng Trị", rate: 40000, estimatedDays: "3-4 ngày" },
  { province: "Tây Ninh", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Thái Bình", rate: 28000, estimatedDays: "2-3 ngày" },
  { province: "Thái Nguyên", rate: 30000, estimatedDays: "2-3 ngày" },
  { province: "Thanh Hóa", rate: 33000, estimatedDays: "3-4 ngày" },
  { province: "Tiền Giang", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Trà Vinh", rate: 40000, estimatedDays: "4-5 ngày" },
  { province: "Tuyên Quang", rate: 38000, estimatedDays: "3-4 ngày" },
  { province: "Vĩnh Long", rate: 38000, estimatedDays: "4-5 ngày" },
  { province: "Vĩnh Phúc", rate: 28000, estimatedDays: "2-3 ngày" },
  { province: "Yên Bái", rate: 42000, estimatedDays: "4-5 ngày" },
];

const seedShippingRates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Clear existing shipping rates
    await ShippingRate.deleteMany({});
    console.log("Cleared existing shipping rates");

    // Insert new shipping rates
    await ShippingRate.insertMany(shippingRates);
    console.log(`✅ Successfully seeded ${shippingRates.length} shipping rates`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding shipping rates:", error);
    process.exit(1);
  }
};

seedShippingRates();
