var express = require("express");
var app = express();
app.use(express.json());
const PORT = process.env.PORT || 5050;
const { categories } = require("./handlers/categories");
const { db, admin } = require("./utils/admin");
const { addCategory } = require("./handlers/addCategory");
app.get("/", (req, res) => {
  res.send("This is my demo project");
});
app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
app.get("/categories", categories);
//categories+jCF4o14hXIxa3oqw1zRi+Top in Japan
app.post("/categories/:pathParam", addCategory);

const addPromotionData = async (pathParam, promotionData) => {
  const category = db.doc(pathParam);

  const catID = await category
    .get()
    .then((doc) => doc.data().parentpromotionDataCategoryId);
  category
    .collection(promotionData.name)
    .add(promotionData)
    .then((res) => {
      category.collection(promotionData.name).doc(res.id).update({
        id: res.id,
        promotionDataCategoryId: catID,
      });
    });
};
// addCategory("Editor’s Favorite Housewares", categoryData).then((id) => {
//   addPromotionData("Editor’s Favorite Housewares/" + id, promotionData);
// });
//addPromotionData("categories/Top Cosmetics", promotionData);
