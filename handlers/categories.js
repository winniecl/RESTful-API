const { db } = require("../utils/admin");

exports.categories = async (req, res) => {
  const categoriesRef = db.collection("categories");
  try {
    categoriesRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      return res.status(201).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};
