const { db, admin } = require("../utils/admin");

exports.addPromotionData = async (req, res) => {
  const arrPathParam = req.params.pathParam.split("+");
  const pathParam = arrPathParam.join("/");
  const promotionData = req.body;
  const category = db.doc(pathParam);
  console.log(category);
  const catID = await category.get().then((doc) => doc.data().id);
  category
    .collection("Promotion Details")
    .add(promotionData)
    .then((res) => {
      category.collection("Promotion Details").doc(res.id).update({
        id: res.id,
        promotionCategoryId: catID,
      });
    });
  res.send("PromotionData is added");
};
