var admin = require("firebase-admin");

var serviceAccount = require("../restful-api-7e766-firebase-adminsdk-zusdk-fb00bf2df6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };
