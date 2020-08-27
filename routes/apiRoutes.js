const db = require("../db/db.json");
const addID = require("../db/dataHandler");
const fs = require("fs");
const util = require("util");

const addIDAsync = util.promisify(addID);

const updateDB = (db) => {
    const newList = JSON.stringify(db);
    fs.writeFile("./db/db.json", newList, (err) => {
        if (err) throw err;
        console.log("File has been updated.");
    });
};


module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        addIDAsync()
        .then(res.json(db));
    });

    app.post("/api/notes", function (req, res) {
        const newNote = {
            "id": db.length + 1 || 1,
            "title": req.body.title,
            "text": req.body.text 
        };
        db.push(newNote);
        updateDB(db);
        res.json(db);
    });

    app.delete("/api/notes/:id", function (req, res) {
        const id = req.params.id;
        let newList;
        for(let i = 0; i < db.length; i++) {
            if (id == db[i].id) {
                db.splice(i,1);
            } else {
                console.log("did not find a match.");
            };
        };
        newList = JSON.stringify(db);
        updateDB(db);
        res.json(db);
        })
};