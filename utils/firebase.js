const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCX1PB5uOIsfb06E_YsMeVGZyhAmasBb-c",
  authDomain: "restful-api-7e766.firebaseapp.com",
  projectId: "restful-api-7e766",
  storageBucket: "restful-api-7e766.appspot.com",
  messagingSenderId: "1092253533841",
  appId: "1:1092253533841:web:57ded4375f301261256130",
  measurementId: "G-KGG96XKB9V",
};

firebase.initializeApp(firebaseConfig);

module.exports = { firebase };
