// Firebase:
// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");

// const {
//   initializeApp,
//   applicationDefault,
//   cert,
// } = require("firebase-admin/app");
// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
//   getDocs,
// } = require("firebase-admin/firestore");

// var serviceAccount = require("G:/Kishor/Projects/Firebase/service-account/serviceAccountKey.json");
// var admin = require("firebase-admin");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// // Database:
// const db = getFirestore(firebaseapp);

// const labs = db.collection("third-sem").doc("labs");

// // Get file:
// let fileData;
// const getFile = async (lab, file) => {
//   const data = await labs.collection(lab).doc(file).get();
//   fileData = await data.data();
// };
// // Write To Store:
// const push = async (lab, data) => {
//   const repo = labs.collection(lab).doc(data.title);
//   const res = await repo.set(data, { merge: true });
// };
// Template files:
const fs = require("fs");
const index = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");
const codeviewer = fs.readFileSync(
  `${__dirname}/templates/codeviewer.html`,
  "utf-8"
);
// Firestore:
const { getFile, push } = require("./modules/firebase");
let fileData;
// Modules:
const replaceCodeViewer = require("./modules/codeviewer");
// Server:
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Main:
app.get("/", (req, res) => {
  // if (req.query.k === "adminkishor")
  res.status(200).send(index);
  // else res.status(200).send("<h1>You do not have access to this site</h1>");
});
// Form:
app.post("/", (req, res) => {
  const data = {
    id: req.body.lab + "-" + req.body.title.toLowerCase(),
    title: req.body.title,
    code: req.body.code,
    timestamp: Date.now(),
  };
  push(req.body.lab, data);
  res.redirect("/");
});
// Java:
app.get("/java", async (req, res) => {
  const fileName = req.query.file;
  fileData = await getFile("java", fileName.toUpperCase());
  res.status(200).send(replaceCodeViewer(codeviewer, fileData));
});
// DSA:
app.get("/dsa", async (req, res) => {
  const fileName = req.query.file;
  fileData = await getFile("dsa", fileName.toUpperCase());
  res.status(200).send(replaceCodeViewer(codeviewer, fileData));
});
// Listen:
app.listen(process.env.PORT || 8000, () => {
  console.log("Listening to requests!");
});
