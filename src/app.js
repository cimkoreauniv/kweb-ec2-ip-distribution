const express = require("express");
const fs = require("fs");

const app = express();

let json;

app.set("views", `${__dirname}/../views`);
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index.pug"));
app.post("/", (req, res) => {
  const { student_number, student_name } = req.body;
  return res.redirect(`/ip?name=${student_name}&number=${student_number}`);
});

app.get("/ip", (req, res) => {
  const { name, number } = req.query;
  if (json[number] && json[number].name === name)
    return res.render("ip.pug", { ip: json[number].ip });
  else return res.end("no data!");
});

app.get("/key", (req, res) => {
  return res.download(`${__dirname}/../files/kweb23-backend-practice-wed.pem`);
});

app.post("/upload", (req, res) => {
  if (req.query.password === process.env.PASSWORD) {
    json = JSON.parse(req.query.payload);
    console.log("Data uploaded");
  } else {
    console.log("Password Incorrect");
  }
  return res.redirect("/");
});

module.exports = app;
