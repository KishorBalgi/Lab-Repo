// Template files:
const bcrypt = require("bcrypt");
const fs = require("fs");
const bodyParser = require("body-parser");
const index = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");
const login = fs.readFileSync(`${__dirname}/templates/login.html`, "utf-8");
const codeviewer = fs.readFileSync(
  `${__dirname}/templates/codeviewer.html`,
  "utf-8"
);
// Firestore:
const { getFile, push, checkCred } = require("./modules/firebase");
let fileData;
let admin = { username: "guest", password: "guest" };
// Modules:
const replaceCodeViewer = require("./modules/codeviewer");
// Server:
const express = require("express");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Main:
app.get("/", (req, res) => {
  res.status(200).send(login);
});

app.post("/", (req, res) => {
  admin = req.body;
  res.redirect("/addlabdata");
});

// Add data:
app.get("/addlabdata", async (req, res) => {
  if (await checkCred(admin.username, admin.password)) {
    return res.status(200).send(index);
  } else {
    return res.status(400).send("<h2>Cannot GET the requested URL</h2>");
  }
});

// Form:
app.post("/add", (req, res) => {
  const data = {
    id: req.body.lab + "-" + req.body.title.toLowerCase(),
    title: req.body.title,
    code: req.body.code,
    timestamp: Date.now(),
  };
  push(req.body.lab, data);
  res.redirect("/");
});
// Code viewer:
app.get("/:lab/:file", async (req, res) => {
  const { lab, file } = req.params;
  fileData = await getFile(lab, file.toUpperCase());
  if (fileData === "error") res.status(404).send("<h1>FILE NOT FOUND!</h1>");
  else res.status(200).send(replaceCodeViewer(codeviewer, fileData));
});

// Listen:
app.listen(process.env.PORT || 8000, () => {
  console.log("Listening to requests!");
});
