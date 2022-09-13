const { db } = require("../utils/admin");

exports.listCategories = async (req, res) => {
  const collectionListRef = db.collection("listOfCollections");
  try {
    collectionListRef.get().then((snapshot) => {
      const result = snapshot.docs.map((doc) => doc.data().name);
      console.log(result);
      return res.send(result);
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};
