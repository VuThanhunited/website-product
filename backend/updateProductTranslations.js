const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// Bản dịch tiếng Anh cho các sản phẩm Kuiper
const productTranslations = {
  // Chăm sóc lốp và cao su
  "Dung dịch làm bóng cao su và lốp xe Tyre Shine Spray. Mã Kuiper : KPST2000S":
    {
      nameEn: "Tire and Rubber Shine Spray Solution. Kuiper Code: KPST2000S",
      descriptionEn:
        "Professional tire and rubber shine solution 20 liters capacity, designed for professional garages and car care workshops. The product creates a beautiful natural shine, protects tires and rubber from UV rays, prevents cracking and aging. Convenient to use, dries quickly, does not splash dirt on the car body.",
    },
  "Dung dịch làm bóng cao su và lốp xe Tyre Shine Spray. Mã Kuiper : KPST5000S":
    {
      nameEn: "Tire and Rubber Shine Spray Solution. Kuiper Code: KPST5000S",
      descriptionEn:
        "Tire and rubber shine solution 5 liters capacity, suitable for individuals and small garages. Advanced formula keeps tires black, shiny and optimally protected. Dust resistant, maintains shine for a long time, safe for all types of exterior rubber.",
    },
  "Dung dịch làm bóng cao su và lốp xe Tyre Shine Spray. Mã Kuiper : KPST500S":
    {
      nameEn: "Tire and Rubber Shine Spray. Kuiper Code: KPST500S",
      descriptionEn:
        "Convenient 500ml tire and rubber shine spray bottle, easy to carry. Spray product helps quick application, creates instant beautiful shine for tires and rubber parts. Suitable for daily car care at home or travel.",
    },

  // Vệ sinh và làm sạch
  "Dung dịch làm sạch bề mặt ô tô. Surface Cleaner. Mã Kuiper : KPSS300B": {
    nameEn: "Car Surface Cleaner. Kuiper Code: KPSS300B",
    descriptionEn:
      "Multi-purpose cleaning solution for all car surfaces, effectively removes stubborn stains, grease and adhesive substances on paint, plastic, metal. Safe for car paint, does not cause fading or yellowing. Balanced pH formula, environmentally friendly.",
  },
  "Dung dịch vệ sinh vành, lốp và cao su ngoại thất. Rubber & Wheel Cleaner. Mã Kuiper : KPSR500P":
    {
      nameEn: "Rubber & Wheel Cleaner. Kuiper Code: KPSR500P",
      descriptionEn:
        "Specialized 500ml cleaning solution for wheels, tires and rubber. Powerful formula breaks down brake dust, road dirt and stubborn stains. Easy to use: spray, wait 1-2 minutes and rinse with water. Safe for all types of alloy and steel wheels.",
    },
  "Nước rửa kính ô tô Extreme Clear View. Mã Kuiper : KPSC100B": {
    nameEn: "Extreme Clear View Windshield Washer. Kuiper Code: KPSC100B",
    descriptionEn:
      "Extreme Clear View specialized windshield washer, cleans windshield quickly without streaks. Effectively removes grease, stuck insects and dirt. Anti-freeze formula, can be used at low temperatures. Protects and extends wiper blade life.",
  },

  // Nước làm mát động cơ
  "Nước làm mát động cơ tím GW12 Kuiper, tỉ lệ 50%. Can 1 lít": {
    nameEn: "Kuiper Purple GW12 Engine Coolant 50%. 1 Liter Can",
    descriptionEn:
      "GW12 technology purple engine coolant, pre-mixed 50% ethylene glycol ratio. Protects engine from freezing down to -37°C and prevents boiling up to 108°C. Anti-corrosion, anti-rust for cooling system. Suitable for European and premium cars.",
  },
  "Nước làm mát động cơ tím GW12 Kuiper, tỉ lệ 50%. Can 5 lít": {
    nameEn: "Kuiper Purple GW12 Engine Coolant 50%. 5 Liter Can",
    descriptionEn:
      "5 liter can of GW12 purple coolant 50% ratio, economical for periodic maintenance or multi-vehicle use. Organic acid technology (OAT) with long service life, comprehensive protection for modern engines. Does not contain harmful phosphate, amine or nitrite.",
  },
  "Nước làm mát động cơ tím GW12, tỉ lệ 30%. Can 1 lít": {
    nameEn: "Purple GW12 Engine Coolant 30%. 1 Liter Can",
    descriptionEn:
      "GW12 purple coolant 30% ratio, suitable for Vietnam's tropical climate. Prevents boiling up to 103°C and freezing to -18°C, optimal cooling system protection. Can be mixed with distilled water according to instructions to adjust appropriate concentration.",
  },
  "Nước làm mát động cơ tím GW12, tỉ lệ 30%. Can 5 lít": {
    nameEn: "Purple GW12 Engine Coolant 30%. 5 Liter Can",
    descriptionEn:
      "5 liter can of GW12 purple coolant 30%, economical choice for hot humid climate. Helps effective heat dissipation, prevents engine overheating. Premium anti-corrosion formula, extends life of water pump, radiator and cooling system components.",
  },
  "Nước làm mát động cơ xanh GW11 Kuiper 30%. Can 1 lít": {
    nameEn: "Kuiper Green GW11 Engine Coolant 30%. 1 Liter Can",
    descriptionEn:
      "GW11 green coolant 30% ratio, hybrid organic acid technology (HOAT). Suitable for most Japanese, Korean and popular cars. Protects engine from overheating, corrosion and sediment. Good compatibility with aluminum and copper cooling systems.",
  },
  "Nước làm mát động cơ xanh GW11 Kuiper 30%. Can 5 lít": {
    nameEn: "Kuiper Green GW11 Engine Coolant 30%. 5 Liter Can",
    descriptionEn:
      "5 liter can of GW11 green coolant 30%, comprehensive solution for garages and home use. Prevents boiling at 103°C and freezing at -18°C. Hybrid formula protects both ferrous and non-ferrous metals, suitable for many car models.",
  },
  "Nước làm mát động cơ xanh GW11 Kuiper 50% . Can 1 lít": {
    nameEn: "Kuiper Green GW11 Engine Coolant 50%. 1 Liter Can",
    descriptionEn:
      "GW11 green coolant 50% concentration, provides highest anti-freeze and anti-boil protection. Protects engine from -37°C to 108°C. Ideal for vehicles operating in harsh conditions or areas with large temperature variations.",
  },
  "Nước làm mát động cơ xanh GW11 Kuiper 50%. Can 5 lít": {
    nameEn: "Kuiper Green GW11 Engine Coolant 50%. 5 Liter Can",
    descriptionEn:
      "5 liter can of GW11 green coolant 50% high concentration, provides maximum engine protection. Long service life, can be used continuously for 3-5 years depending on operating conditions. No dilution needed, ready to use.",
  },
};

// Bản dịch cho categories
const categoryTranslations = {
  "Chăm sóc lốp và cao su": "Tire and Rubber Care",
  "Vệ sinh và làm sạch": "Cleaning and Washing",
  "Nước làm mát động cơ": "Engine Coolant",
  "Phụ kiện xe hơi": "Car Accessories",
};

async function updateProductTranslations() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");

    // Lấy tất cả sản phẩm
    const products = await Product.find();
    console.log(`Found ${products.length} products to update`);

    let updatedCount = 0;

    for (const product of products) {
      const translation = productTranslations[product.name];

      if (translation) {
        product.nameEn = translation.nameEn;
        product.descriptionEn = translation.descriptionEn;
        await product.save();
        updatedCount++;
        console.log(`✓ Updated: ${product.name}`);
      } else {
        console.log(`✗ No translation found for: ${product.name}`);
      }
    }

    console.log(
      `\n✅ Updated ${updatedCount} out of ${products.length} products`
    );
    console.log("Translation update completed!");

    process.exit(0);
  } catch (error) {
    console.error("Error updating translations:", error);
    process.exit(1);
  }
}

// Chạy script
updateProductTranslations();
