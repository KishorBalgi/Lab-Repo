// Firebase:
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  getDocs,
} = require("firebase-admin/firestore");

var serviceAccount = require("G:/Kishor/Projects/Firebase/service-account/serviceAccountKey.json");
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Database:
const db = getFirestore();

const labs = db.collection("third-sem").doc("labs");
const labDoc = db
  .collection("third-sem")
  .doc("labs")
  .collection("java")
  .getDocs();

// Get file:
let fileData;
const getFile = async (lab, file) => {
  const data = await labs.collection(lab).doc(file).get();
  fileData = await data.data();
};
// Write To Store:
const push = async (lab, data) => {
  const repo = labs.collection(lab).doc(data.title);
  const res = await repo.set(data, { merge: true });
};
// Template files:
const fs = require("fs");
const index = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");
const codeviewer = fs.readFileSync(
  `${__dirname}/templates/codeviewer.html`,
  "utf-8"
);

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

app.get("/", (req, res) => {
  res.status(200).send(index);
  console.log(labDoc);
});

app.get("/view", (req, res) => {
  res.status(200).send(replaceCodeViewer(codeviewer, fileData));
});

app.get("/dsa", async (req, res) => {
  const fileName = req.query.file;
  await getFile("dsa", fileName.toUpperCase());
  res.redirect("/view");
});

app.get("/java", async (req, res) => {
  const fileName = req.query.file;
  await getFile("java", fileName.toUpperCase());
  res.redirect("/view");
});

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

app.listen(8000, () => {
  console.log("Listening to requests!");
});
