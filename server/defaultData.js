import productsData from "./constant/productsData.js";
import Products from "./modals/productSchema.js";

const DefaultData = async () => {
  try {
    await Products.deleteMany({});
    const storeData = await Products.insertMany(productsData);
  } catch (err) {
    console.log("error on storing", err.message);
  }
};

export default DefaultData;
