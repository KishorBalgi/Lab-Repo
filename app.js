// Template files:
const fs = require("fs");
const bodyParser = require("body-parser");
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
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Main:
app.get("/", (req, res) => {
  res.status(200).send(index);
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
