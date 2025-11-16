const mongoose = require("mongoose");
require("dotenv").config();
const CompanyInfo = require("./models/CompanyInfo");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const updatePartners = async () => {
  try {
    const result = await CompanyInfo.updateOne(
      {},
      {
        $set: {
          partners: [
            {
              name: "Shopee",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/200px-Shopee_logo.svg.png",
              website: "https://shopee.vn",
            },
            {
              name: "Lazada",
              logo: "https://lzd-img-global.slatic.net/g/p/c8045982f9234585c82ed024ed29861f.png",
              website: "https://lazada.vn",
            },
            {
              name: "Tiki",
              logo: "https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png",
              website: "https://tiki.vn",
            },
          ],
        },
      }
    );

    console.log("✓ Updated partners - removed Sendo");
    console.log(`Modified ${result.modifiedCount} document(s)`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating partners:", error);
    process.exit(1);
  }
};

updatePartners();
