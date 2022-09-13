const { db } = require("../utils/admin");

exports.listCategories = async (req, res) => {
  const collectionListRef = db.collection("listOfCollections");
  try {
    collectionListRef.get().then((snapshot) => {
      const result = snapshot.docs.map((doc) => doc.data().name);
      return res.send(result);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};
