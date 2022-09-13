const { db } = require("../utils/admin");
exports.retrievePromo = async (req, res) => {
  const arrPathParam = req.params.pathParam.split("+");
  const pathParam = arrPathParam.join("/");
  const promoRef = db.doc(pathParam).collection("Promotion Details");
  promoRef.get().then((snapshot) => {
    const result = snapshot.docs.map((doc) => doc.data());
    if (!result)
      return res.status(404).send("The course with given ID was not found");
    res.send(result);
  });
};
