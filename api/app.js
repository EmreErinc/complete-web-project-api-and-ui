const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const cors = require("cors");

// Create server
const app = express();
app.use(bodyParser.json());
app.use(cors());

db.defaults({
    posts: [],
    references: [],
    user: {},
    contact: {}
}).write();

app.post("/login", (req, res) => {
    var user = db.get("user").filter(u => u.name == req.body.name && u.password == req.body.password).value();

    if (user == null) {
        res.status(404).send("User Not Found");
    } else {
        res.status(200).send("Welcome!");
    }
});

app.get("/contact", (req, res) => {
    var post = db.get("contact");
    res.send(post);
});

app.post("/contact", (req, res) => {
    db.get("contact").push(req.body).write();
    res.status(200).send("saved");
});

app.put("/contact", (req, res) => {
    db.get("contact").assign(req.body).write();
    res.status(200).send("updated");
});

app.post("/references", (req, res) => {
    db.get("references").push(req.body).last().assign({
        id: Date.now()
    }).write();
    res.status(200).send("saved");
});

app.get("/references", (req, res) => {
    var post = db.get("references").filter(p => p.published == true).value();
    res.send(post);
});

app.get("/references/:id", (req, res) => {
    var post = db.get("references").find({
        id: parseInt(req.params.id)
    }).value();
    res.send(post);
});

app.put("/references/:id", (req, res) => {
    var post = db.get("references").find({
        id: parseInt(req.params.id)
    }).assign(req.body).write();
    res.status(200).send("updated");
});

app.delete("/references/:id", (req, res) => {
    var post = db.get("references").remove({
        id: parseInt(req.params.id)
    }).write();
    res.status(200).send("deleted");
});

app.post("/posts", (req, res) => {
    db.get("posts").push(req.body).last().assign({
        id: Date.now()
    }).write();
    res.status(200).send("saved");
});

app.get("/posts", (req, res) => {
    var post = db.get("posts").filter(p => p.published == true).value();
    res.send(post);
});

app.get("/posts/:id", (req, res) => {
    var post = db.get("posts").find({
        id: parseInt(req.params.id)
    }).value();
    res.send(post);
});

app.put("/posts/:id", (req, res) => {
    var post = db.get("posts").find({
        id: parseInt(req.params.id)
    }).assign(req.body).write();
    res.status(200).send("updated");
});

app.delete("/posts/:id", (req, res) => {
    var post = db.get("posts").remove({
        id: parseInt(req.params.id)
    }).write();
    res.status(200).send("deleted");
});

app.listen(4000, () => console.log("listening on port 4000"));

// "build": "babel lib -d dist",
// "start": "npm run build && nodemon dist/app.js",
// "serve": "node dist/app.js"