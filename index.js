var express = require("express");
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
//const { firebase } = require("./utils/firebase");
app.get("/categories", categories);
const catData = {
  name: "Hello",
  parentPromotionCategoryId: "1",
  subCategoryCount: 0,
};
const addParent = async (catName, catData) => {
  const parentCat = db.collection(catName);
  const res = await parentCat.add(catData);
  parentCat.doc(res.id).update({
    id: res.id,
  });
  return res.id;
};

const promotion = {
  name: "PromoCat1",
  description: "<div>Hello<br/>This is nice!</div>",
  imageUrlList: ["http://localhost:3000/assets/123.jpg"],
  subCategoryCount: 0,
};
const addAPromotion = async (path, promotion) => {
  const category = db.doc(path);
  const subCategory = await category.collection(promotion.name).get();
  if (promotion.subCategoryCount === 0 && subCategory.empty) {
    console.log("yes");
    category.update({
      subCategoryCount: admin.firestore.FieldValue.increment(1),
    });
  } else console.log("no");
  const catID = await category
    .get()
    .then((doc) => doc.data().parentPromotionCategoryId);
  category
    .collection(promotion.name)
    .add(promotion)
    .then((res) => {
      category.collection(promotion.name).doc(res.id).update({
        id: res.id,
        promotionCategoryId: catID,
      });
    });
};
// addParent("Editor’s Favorite Housewares", catData).then((id) => {
//   addAPromotion("Editor’s Favorite Housewares/" + id, promotion);
// });
addAPromotion(
  "Editor’s Favorite Housewares/" + "WdKlnHMo7GQ6xrSijTD4",
  promotion
);
