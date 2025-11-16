const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Product = require("./models/Product");
const Slogan = require("./models/Slogan");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Helper function to generate English content
const generateEnglishContent = (product) => {
  let nameEn = product.name
    .replace(
      /Dung dịch làm bóng cao su và lốp xe/gi,
      "Tire & Rubber Shine Solution"
    )
    .replace(/Dung dịch làm sạch bề mặt ô tô/gi, "Car Surface Cleaner")
    .replace(
      /Dung dịch vệ sinh vành, lốp và cao su ngoại thất/gi,
      "Wheel, Tire & Rubber Cleaner"
    )
    .replace(/Nước làm mát động cơ/gi, "Engine Coolant")
    .replace(/Nước rửa kính ô tô/gi, "Car Glass Cleaner")
    .replace(/Nước rửa xe không chạm/gi, "Touchless Car Wash")
    .replace(/tím/gi, "Purple")
    .replace(/xanh/gi, "Green")
    .replace(/Can/gi, "Can")
    .replace(/lít/gi, "L")
    .replace(/tỉ lệ/gi, "Ratio")
    .replace(/Mã Kuiper/gi, "Kuiper Code");

  let descEn = product.description
    // Multi-word phrases first (most specific to least specific)
    .replace(/Can 5 lít nước làm mát/gi, "5 liter can of coolant")
    .replace(/Can 1 lít nước làm mát/gi, "1 liter can of coolant")
    .replace(/Can 20 lít/gi, "20 liter can")
    .replace(/Can 5 lít/gi, "5 liter can")
    .replace(/Can 1 lít/gi, "1 liter can")
    .replace(/nước làm mát động cơ/gi, "engine coolant")
    .replace(/nước làm mát/gi, "coolant")
    .replace(/nước rửa xe không chạm/gi, "touchless car wash")
    .replace(/nước rửa xe/gi, "car wash solution")
    .replace(/nước rửa kính/gi, "glass cleaner")
    .replace(/nước cất/gi, "distilled water")
    .replace(/dung dịch làm bóng/gi, "shine solution")
    .replace(/dung dịch làm sạch/gi, "cleaning solution")
    .replace(/dung dịch vệ sinh/gi, "cleaning solution")
    .replace(/dung dịch tẩy rửa/gi, "cleaning solution")
    .replace(/dung dịch rửa xe/gi, "car wash solution")
    .replace(/động cơ/gi, "engine")
    .replace(/quá nhiệt/gi, "overheating")
    .replace(/ngăn ngừa quá nhiệt/gi, "prevents overheating")
    .replace(/ngăn ngừa/gi, "prevents")
    .replace(/ăn mòn/gi, "corrosion")
    .replace(/gỉ sét/gi, "rust")
    .replace(/chống ăn mòn/gi, "anti-corrosion")
    .replace(/chống gỉ sét/gi, "anti-rust")
    .replace(/chống sôi/gi, "anti-boil")
    .replace(/chống đông/gi, "anti-freeze")
    .replace(/chống đóng băng/gi, "anti-freeze")
    .replace(/chống nứt nẻ/gi, "prevents cracking")
    .replace(/chống bám bụi/gi, "resists dust")
    .replace(/chống/gi, "anti")
    .replace(/không chạm/gi, "touchless")
    .replace(/tiện lợi/gi, "convenient")
    .replace(/hiện đại/gi, "modern")
    .replace(/truyền thống/gi, "traditional")
    .replace(/màu tím/gi, "purple")
    .replace(/màu xanh/gi, "green")
    .replace(/tím/gi, "purple")
    .replace(/xanh lá/gi, "green")
    .replace(/xanh/gi, "green")
    .replace(/đỏ/gi, "red")
    .replace(/GW12 tím/gi, "GW12 purple")
    .replace(/GW12 đỏ/gi, "GW12 red")
    .replace(/GW11 xanh/gi, "GW11 green")
    .replace(/bề mặt ô tô/gi, "car surface")
    .replace(/bề mặt xe/gi, "vehicle surface")
    .replace(/ô tô/gi, "car")
    .replace(/chất lượng cao/gi, "high quality")
    .replace(/không gây/gi, "does not cause")
    .replace(/không để vệt/gi, "streak-free")
    .replace(/côn trùng bám dính/gi, "stuck insects")
    .replace(/chống đóng băng/gi, "anti-freeze")
    .replace(/nhiệt độ thấp/gi, "low temperatures")
    .replace(/tạo bọt dày/gi, "creates thick foam")
    .replace(/bám tốt/gi, "adheres well")
    .replace(/bề mặt xe/gi, "vehicle surface")
    .replace(/máy rửa xe áp lực cao/gi, "high-pressure washer")
    .replace(/bình phun bọt tuyết/gi, "snow foam lance")
    .replace(/pH trung tính/gi, "pH neutral")
    .replace(/lớp phủ ceramic/gi, "ceramic coating")
    .replace(/vành hợp kim/gi, "alloy wheels")
    .replace(/cặn phanh/gi, "brake dust")
    .replace(/bụi đường/gi, "road dirt")
    .replace(/bám cứng/gi, "stuck-on")
    .replace(/xả sạch/gi, "rinse")
    .replace(/bằng nước/gi, "with water")
    .replace(/Chai xịt/gi, "Spray bottle")
    .replace(/dễ mang theo/gi, "easy to carry")
    .replace(/tạo độ bóng/gi, "creates shine")
    .replace(/lốp xe/gi, "tires")
    .replace(/chi tiết cao su/gi, "rubber details")
    .replace(/chăm sóc xe/gi, "car care")
    .replace(/hàng ngày/gi, "daily")
    .replace(/tại nhà/gi, "at home")
    .replace(/đi du lịch/gi, "traveling")
    .replace(/dạng xịt/gi, "spray form")
    .replace(/tức thì/gi, "instantly")
    .replace(/vết bẩn cứng đầu/gi, "stubborn stains")
    .replace(/dầu mỡ/gi, "grease and oil")
    .replace(/các chất bám dính/gi, "adhesive substances")
    .replace(/pH cân bằng/gi, "pH balanced")
    .replace(/thân thiện với môi trường/gi, "environmentally friendly")
    .replace(/pha sẵn/gi, "pre-mixed")
    .replace(/khỏi đông đá/gi, "from freezing")
    .replace(/chống sôi/gi, "anti-boil")
    .replace(/chống ăn mòn/gi, "anti-corrosion")
    .replace(/chống gỉ sét/gi, "anti-rust")
    .replace(/hệ thống làm mát/gi, "cooling system")
    .replace(/xe Châu Âu/gi, "European cars")
    .replace(/xe cao cấp/gi, "premium cars")
    .replace(/bảo dưỡng định kỳ/gi, "regular maintenance")
    .replace(/nhiều xe/gi, "multiple vehicles")
    .replace(/tuổi thọ cao/gi, "long life")
    .replace(/động cơ hiện đại/gi, "modern engines")
    .replace(/không chứa/gi, "does not contain")
    .replace(/có hại/gi, "harmful")
    .replace(/khí hậu nhiệt đới/gi, "tropical climate")
    .replace(/Việt Nam/gi, "Vietnam")
    .replace(/ngăn ngừa quá nhiệt/gi, "prevents overheating")
    .replace(/kéo dài tuổi thọ/gi, "extends life")
    .replace(/bơm nước/gi, "water pump")
    .replace(/két nước/gi, "radiator")
    .replace(/có thể pha thêm/gi, "can be diluted")
    .replace(/nước cất/gi, "distilled water")
    .replace(/theo hướng dẫn/gi, "according to instructions")
    .replace(/để điều chỉnh/gi, "to adjust")
    .replace(/đa số xe/gi, "most vehicles")
    .replace(/xe phổ thông/gi, "common vehicles")
    .replace(/tương thích tốt/gi, "compatible")
    .replace(/kim loại màu/gi, "non-ferrous metals")
    .replace(/kim loại đen/gi, "ferrous metals")
    .replace(/nhiều dòng xe/gi, "many vehicle types")
    .replace(/cung cấp khả năng/gi, "provides")
    .replace(/chống đông/gi, "anti-freeze")
    .replace(/cao nhất/gi, "maximum")
    .replace(
      /hoạt động trong điều kiện khắc nghiệt/gi,
      "operating in harsh conditions"
    )
    .replace(
      /vùng có nhiệt độ thay đổi lớn/gi,
      "areas with large temperature variations"
    )
    .replace(/tùy điều kiện vận hành/gi, "depending on operating conditions")
    .replace(/không cần pha thêm/gi, "no dilution needed")
    .replace(/sẵn sàng sử dụng ngay/gi, "ready to use")
    .replace(/kính lái/gi, "windshield")
    .replace(/gạt nước/gi, "wiper blades")
    .replace(/bụi bẩn/gi, "dirt and dust")
    .replace(/lớp bóng đẹp tự nhiên/gi, "beautiful natural shine")
    .replace(/tia UV/gi, "UV rays")
    .replace(/chống nứt nẻ/gi, "prevents cracking")
    .replace(/lão hóa/gi, "aging")
    .replace(/khô nhanh/gi, "dries quickly")
    .replace(/không bắn bẩn vào thành xe/gi, "doesn't splash onto car body")
    .replace(/gara nhỏ/gi, "small garage")
    .replace(/luôn đen bóng/gi, "always black and shiny")
    .replace(/mịn màng/gi, "smooth")
    .replace(/được bảo vệ tối ưu/gi, "optimally protected")
    .replace(/chống bám bụi/gi, "resists dust")
    .replace(/giữ độ bóng lâu dài/gi, "maintains shine for long time")
    .replace(/lựa chọn kinh tế/gi, "economical choice")
    .replace(/khí hậu nóng ẩm/gi, "hot and humid climate")
    .replace(/tản nhiệt/gi, "heat dissipation")
    .replace(/organic acid technology/gi, "organic acid technology")
    .replace(
      /hybrid organic acid technology/gi,
      "hybrid organic acid technology"
    )
    .replace(/ethylene glycol/gi, "ethylene glycol")
    .replace(/phosphate/gi, "phosphate")
    .replace(/amine/gi, "amine")
    .replace(/nitrite/gi, "nitrite")
    // Single words
    .replace(/chuyên dụng/gi, "professional")
    .replace(/dung tích/gi, "capacity")
    .replace(/sản phẩm/gi, "product")
    .replace(/bảo vệ/gi, "protects")
    .replace(/an toàn/gi, "safe")
    .replace(/hiệu quả/gi, "effective")
    .replace(/nhanh chóng/gi, "quickly")
    .replace(/tiện dụng/gi, "convenient")
    .replace(/phù hợp/gi, "suitable")
    .replace(/thích hợp/gi, "suitable")
    .replace(/đa năng/gi, "multi-purpose")
    .replace(/loại bỏ/gi, "removes")
    .replace(/vết bẩn/gi, "stains")
    .replace(/cứng đầu/gi, "stubborn")
    .replace(/cao cấp/gi, "premium")
    .replace(/giúp/gi, "helps")
    .replace(/sử dụng/gi, "use")
    .replace(/luôn/gi, "always")
    .replace(/mọi loại/gi, "all types")
    .replace(/hoặc/gi, "or")
    .replace(/trên/gi, "on")
    .replace(/sơn/gi, "paint")
    .replace(/nhựa/gi, "plastic")
    .replace(/kim loại/gi, "metal")
    .replace(/mờ/gi, "dullness")
    .replace(/hay/gi, "or")
    .replace(/ố vàng/gi, "yellowing")
    .replace(/công thức/gi, "formula")
    .replace(/tẩy rửa/gi, "cleaning")
    .replace(/vành/gi, "wheels")
    .replace(/mạnh mẽ/gi, "powerful")
    .replace(/phân hủy/gi, "breaks down")
    .replace(/đơn giản/gi, "simple")
    .replace(/xịt/gi, "spray")
    .replace(/chờ/gi, "wait")
    .replace(/phút/gi, "minutes")
    .replace(/và/gi, "and")
    .replace(/thép/gi, "steel")
    .replace(/ở nhiệt độ xuống/gi, "at temperatures down to")
    .replace(/đến/gi, "to")
    .replace(/tiết kiệm/gi, "economical")
    .replace(/toàn diện/gi, "comprehensive")
    .replace(/nồng độ/gi, "concentration")
    .replace(/Nhật/gi, "Japanese")
    .replace(/Hàn/gi, "Korean")
    .replace(/giải pháp/gi, "solution")
    .replace(/garage/gi, "garage")
    .replace(/gia đình/gi, "family")
    .replace(/cả/gi, "both")
    .replace(/nhôm/gi, "aluminum")
    .replace(/đồng/gi, "copper")
    .replace(/lý tưởng/gi, "ideal")
    .replace(/liên tục/gi, "continuously")
    .replace(/năm/gi, "years")
    .replace(/làm sạch/gi, "cleans")
    .replace(/pha loãng/gi, "diluted")
    .replace(/dung dịch/gi, "solution")
    .replace(/làm mềm/gi, "softens")
    .replace(/dành cho gara/gi, "for garage")
    .replace(/xưởng/gi, "workshop")
    .replace(/chuyên nghiệp/gi, "professional")
    .replace(/cá nhân/gi, "personal")
    .replace(/tiên tiến/gi, "advanced")
    .replace(/lốp/gi, "tires")
    .replace(/các chi tiết/gi, "details")
    .replace(/cao su/gi, "rubber")
    .replace(/cho/gi, "for")
    .replace(/việc/gi, "")
    .replace(/từ/gi, "from")
    .replace(/ngoại thất/gi, "exterior")
    .replace(/với/gi, "with")
    .replace(/được/gi, "")
    .replace(/khỏi/gi, "from")
    .replace(/đẹp/gi, "beautiful")
    .replace(/các/gi, "")
    .replace(/tại/gi, "at")
    .replace(/của/gi, "")
    .replace(/có thể/gi, "can")
    .replace(/tuổi thọ/gi, "lifespan")
    .replace(/dài/gi, "long")
    .replace(/tạo/gi, "creates")
    .replace(/mọi/gi, "all")
    .replace(/tỉ lệ/gi, "ratio")
    .replace(/nồng độ cao/gi, "high concentration")
    .replace(/công nghệ/gi, "technology")
    .replace(/sự bảo vệ/gi, "protection")
    .replace(/tối đa/gi, "maximum")
    .replace(/mang lại/gi, "provides")
    .replace(/làm bóng/gi, "shine")
    .replace(/tạo lớp/gi, "creates layer")
    .replace(/thành xe/gi, "car body")
    .replace(/cặn/gi, "residue")
    .replace(/bẩn/gi, "dirt")
    .replace(/quá/gi, "over")
    .replace(/lít/gi, "liters")
    .replace(/xe/gi, "vehicle")
    .replace(/Can/gi, "can")
    .replace(/sự/gi, "")
    .replace(/ở/gi, "at")
    .replace(/tới/gi, "to")
    .replace(/tối/gi, "optimal")
    .replace(/ưu/gi, "")
    // Clean up
    .replace(/\s+/g, " ")
    .trim();

  return { nameEn, descEn };
};

const updateProducts = async () => {
  try {
    // Update all products with English content
    const products = await Product.find();
    console.log(`Found ${products.length} products to update`);

    for (const product of products) {
      const { nameEn, descEn } = generateEnglishContent(product);
      product.nameEn = nameEn;
      product.descriptionEn = descEn;
      await product.save();
      console.log(`✓ Updated: ${product.name.substring(0, 50)}...`);
    }

    // Update slogans
    const slogans = await Slogan.find();
    const sloganTranslations = {
      "Sản Phẩm Chất Lượng Với Giá Cả Phải Chăng":
        "Quality Products at Affordable Prices",
      "Giao Hàng Nhanh Chóng Toàn Quốc": "Fast Nationwide Delivery",
      "Đảm Bảo Sự Hài Lòng Của Khách Hàng": "Customer Satisfaction Guaranteed",
    };

    for (const slogan of slogans) {
      if (sloganTranslations[slogan.text]) {
        slogan.textEn = sloganTranslations[slogan.text];
        await slogan.save();
        console.log(`✓ Updated slogan: ${slogan.text}`);
      }
    }

    console.log("\n✅ All products and slogans updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

updateProducts();
