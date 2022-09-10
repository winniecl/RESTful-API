var express = require("express");
const path = require("path");
var app = express();
const PORT = process.env.PORT || 5050;
app.get("/", (req, res) => {
  res.send("This is my demo project");
});
app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});

const { categories } = require("./handlers/categories");
const { db, admin } = require("./utils/admin");
app.get("/categories", categories);
const categoryData = {
  name: "Hello",
  parentpromotionDataCategoryId: "1",
  subCategoryCount: 0,
};
const addCategory = async (pathParam, categoryData) => {
  const parentCat = db.doc(pathParam);

  const subCategory = await category.collection(promotionData.name).get();
  if (categoryData.subCategoryCount === 0 && subCategory.empty) {
    console.log("yes");
    parentCat.update({
      subCategoryCount: admin.firestore.FieldValue.increment(1),
    });
  }

  const res = await parentCat.add(categoryData);
  parentCat.doc(res.id).update({
    id: res.id,
  });
  return res.id;
};
//addCategory("categories/42BqeaKmGVLZmK79usOd/Top Cosmetics", categoryData);
const pathParam = "categories/42BqeaKmGVLZmK79usOd/Top Cosmetics";
console.log(pathParam.split(path.sep).length);

const promotionData = {
  name: "PromoCat1",
  description: "<div>Hello<br/>This is nice!</div>",
  imageUrlList: ["http://localhost:3000/assets/123.jpg"],
};
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
