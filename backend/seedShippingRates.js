const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ShippingRate = require("./models/ShippingRate");

dotenv.config();

// Sample shipping rates for Vietnam provinces
const shippingRates = [
  { province: "Hà Nội", rate: 20000, estimatedDays: "1-2 ngày" },
  { province: "Hồ Chí Minh", rate: 25000, estimatedDays: "2-3 ngày" },
  { province: "Đà Nẵng", rate: 30000, estimatedDays: "2-3 ngày" },
  { province: "Hải Phòng", rate: 25000, estimatedDays: "1-2 ngày" },
  { province: "Cần Thơ", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Bắc Ninh", rate: 22000, estimatedDays: "1-2 ngày" },
  { province: "Bình Dương", rate: 27000, estimatedDays: "2-3 ngày" },
  { province: "Đồng Nai", rate: 28000, estimatedDays: "2-3 ngày" },
  { province: "Long An", rate: 32000, estimatedDays: "3-4 ngày" },
  { province: "Quảng Ninh", rate: 30000, estimatedDays: "2-3 ngày" },
  { province: "Nghệ An", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Thanh Hóa", rate: 33000, estimatedDays: "3-4 ngày" },
  { province: "Khánh Hòa", rate: 38000, estimatedDays: "3-4 ngày" },
  { province: "Lâm Đồng", rate: 40000, estimatedDays: "4-5 ngày" },
  { province: "Bình Thuận", rate: 42000, estimatedDays: "4-5 ngày" },
  { province: "Thừa Thiên Huế", rate: 35000, estimatedDays: "3-4 ngày" },
  { province: "Quảng Nam", rate: 37000, estimatedDays: "3-4 ngày" },
  { province: "Gia Lai", rate: 45000, estimatedDays: "4-5 ngày" },
  { province: "Đắk Lắk", rate: 43000, estimatedDays: "4-5 ngày" },
  { province: "An Giang", rate: 40000, estimatedDays: "4-5 ngày" },
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
    console.log(
      `✅ Successfully seeded ${shippingRates.length} shipping rates`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error seeding shipping rates:", error);
    process.exit(1);
  }
};

seedShippingRates();
