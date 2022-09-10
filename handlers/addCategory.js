const { db, admin } = require("../utils/admin");

exports.addCategory = async (req, res) => {
  const arrPathParam = req.params.pathParam.split("+");
  const pathParam = arrPathParam.join("/");
  const categoryData = req.body;
  const n = arrPathParam.length;
  const last = arrPathParam.pop();
  const parentPath = arrPathParam.join("/");
  let parentCat;
  let newCat;
  if (n % 2 === 0) {
    newCat = db.doc(pathParam);
    parentCat = db.collection(parentPath);
    const subCategory = await parentCat.collection(last).get();
    if (categoryData.subCategoryCount === 0 && subCategory.empty) {
      console.log("yes");
      parentCat.update({
        subCategoryCount: admin.firestore.FieldValue.increment(1),
      });
    } else console.log("no");

    const response = await newCat.add(categoryData);
    newCat.doc(response.id).update({
      id: response.id,
    });
    res.status(200).send(response.id);
  } else {
    newCat = db.collection(pathParam);
    parentCat = db.doc(parentPath);
    const subCategory = await parentCat.collection(last).get();
    if (categoryData.subCategoryCount === 0 && subCategory.empty) {
      console.log("yes2");
      parentCat.update({
        subCategoryCount: admin.firestore.FieldValue.increment(1),
      });
    } else console.log("no2");

    const response = await newCat.add(categoryData);
    newCat.doc(response.id).update({
      id: response.id,
    });
    res.status(200).send(response.id);
  }
};
