const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGODB_URI =
  "mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty";

// Danh sách URL ảnh working từ IMAGE_URLS.txt - match với tên sản phẩm trong database
const imageMapping = [
  {
    id: "69186fea7bb86f19db86bed8",
    name: "Dung dịch làm bóng cao su và lốp xe Tyre Shine Spray. Mã Kuiper : KPST500S",
    image:
      "https://www.ppp.vn/product_images/i/327/Tyre_Shine_Spray_500ml_02__35065_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bed6",
    name: "Dung dịch làm bóng cao su và lốp xe Tyre Shine Spray. Mã Kuiper : KPST2000S",
    image:
      "https://www.ppp.vn/product_images/s/545/Dung_d%E1%BB%8Bch_b%C3%B3ng_l%E1%BB%91p_v%C3%A0_cao_su_20_L%C3%ADt_Kuiper__63759_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bed7",
    name: "Dung dịch làm bóng cao su và lốp xe Tyre Shine Spray. Mã Kuiper : KPST5000S",
    image:
      "https://www.ppp.vn/product_images/a/268/dung_d%E1%BB%8Bch_b%C3%B3ng_l%E1%BB%91p_Kuiper_5_L%C3%ADt__79144_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bed9",
    name: "Dung dịch làm sạch bề mặt ô tô. Surface Cleaner. Mã Kuiper : KPSS300B",
    image:
      "https://www.ppp.vn/product_images/v/978/Dung_d%E1%BB%8Bch_l%C3%A0m_s%E1%BA%A1ch_b%E1%BB%81_m%E1%BA%B7t_Surface_Cleaner_-_Kuiper_VN__85904_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bedc",
    name: "Nước làm mát động cơ tím GW12 Kuiper, tỉ lệ 50%. Can 5 lít",
    image:
      "https://www.ppp.vn/product_images/l/677/N%C6%B0%E1%BB%9Bc_l%C3%A0m_m%C3%A1t_Kuiper_T%C3%ADm_Gw12__54107_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bede",
    name: "Nước làm mát động cơ tím GW12, tỉ lệ 30%. Can 5 lít",
    image:
      "https://www.ppp.vn/product_images/b/457/17e3254fe2be3ee067af__60897_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bedd",
    name: "Nước làm mát động cơ tím GW12, tỉ lệ 30%. Can 1 lít",
    image:
      "https://www.ppp.vn/product_images/w/608/ea1b9abb5d4a8114d85b__39315_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bedf",
    name: "Nước làm mát động cơ xanh GW11 Kuiper 30%. Can 1 lít",
    image:
      "https://www.ppp.vn/product_images/b/998/47b7771bb0ea6cb435fb__76998_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bee0",
    name: "Nước làm mát động cơ xanh GW11 Kuiper 30%. Can 5 lít",
    image:
      "https://www.ppp.vn/product_images/k/361/f134847442859edbc794__47065_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bee2",
    name: "Nước làm mát động cơ xanh GW11 Kuiper 50%. Can 5 lít",
    image:
      "https://www.ppp.vn/product_images/c/108/N%C6%B0%E1%BB%9Bc_l%C3%A0m_m%C3%A1t_%C4%91%C3%B4ng_c%C6%A1_Kuiper_GW11__94441_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bee1",
    name: "Nước làm mát động cơ xanh GW11 Kuiper 50% . Can 1 lít",
    image:
      "https://www.ppp.vn/product_images/y/936/N%C6%B0%E1%BB%9Bc_l%C3%A0m_m%C3%A1t_%C4%91%E1%BB%99ng_c%C6%A1_Kuiper_xanh_1L__73304_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bee3",
    name: "Nước rửa kính ô tô Extreme Clear View. Mã Kuiper : KPSC100B",
    image:
      "https://www.ppp.vn/product_images/b/056/N%C6%B0%E1%BB%9Bc_r%E1%BB%ADa_k%C3%ADnh_Extreme_Clear_View_-_Kuiper_01__36021_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86bee4",
    name: "Nước rửa xe không chạm 5L (TL 1:10) Kuiper Touchless Car Wash Foam",
    image:
      "https://www.ppp.vn/product_images/q/821/N%C6%B0%E1%BB%9Bc_r%E1%BB%ADa_xe_kh%C3%B4ng_ch%E1%BA%A1m_Kuiper_5_L%C3%ADt__50180_thumb.png",
  },
  {
    id: "69186fea7bb86f19db86bedb",
    name: "Nước làm mát động cơ tím GW12 Kuiper, tỉ lệ 50%. Can 1 lít",
    image:
      "https://www.ppp.vn/product_images/x/392/N%C6%B0%E1%BB%9Bc_l%C3%A0m_m%C3%A1t_Kuiper_%C4%91%E1%BB%8F_1L__82538_thumb.jpg",
  },
  {
    id: "69186fea7bb86f19db86beda",
    name: "Dung dịch vệ sinh vành, lốp và cao su ngoại thất. Rubber & Wheel Cleaner. Mã Kuiper : KPSR500P",
    image:
      "https://www.ppp.vn/product_images/x/168/Rubber_and_Wheel_Cleaner_02__05669_thumb.jpg",
  },
];

async function fixProductImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    let updatedCount = 0;

    for (const mapping of imageMapping) {
      const product = await Product.findById(mapping.id);

      if (product) {
        product.images = [mapping.image];
        await product.save();

        console.log(`✅ Updated: ${product.name.substring(0, 50)}...`);
        console.log(`   New image: ${mapping.image}\n`);
        updatedCount++;
      } else {
        console.log(`⚠️  Product not found: ${mapping.name}`);
      }
    }

    console.log(
      `\n🎉 Successfully updated ${updatedCount}/${imageMapping.length} products!`
    );
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
}

fixProductImages();
