var express = require("express");
var app = express();
const PORT = process.env.PORT || 5050;
const { addCategory } = require("./handlers/addCategory");
const { listCategories } = require("./handlers/listCategories");
const { addPromotionData } = require("./handlers/addPromotion");
const { retrievePromo } = require("./handlers/retreivePromo");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is my demo project");
});
app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});

// API A: Retrieve a list of promotion categories
app.get("/categories/list", listCategories);
// API B: Retrieve promotion details
app.get("/categories/getPromo/:pathParam", retrievePromo);
// API C: Create a new promotion category
app.post("/categories/createCat/:pathParam", addCategory);
// API D: Add promotion details
app.post("/categories/addPromo/:pathParam", addPromotionData);
