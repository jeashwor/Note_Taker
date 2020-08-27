const db = require("../db/db.json");
const addID = require("../db/dataHandler");
const fs = require("fs");

const updateDB = (db) => {
    const newList = JSON.stringify(db);
    fs.writeFile("./db/db.json", newList, (err) => {
        if (err) throw err;
        console.log("File has been updated.");
    });
};

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        addID();
        res.json(db);
    });

    app.post("/api/notes", function (req, res) {
        db.push(req.body);
        console.log(req.body.title);
        updateDB(db);
        res.json(db);
    });

    app.delete("/api/notes/:id", function (req, res) {
        console.log(req.params);
        const id = req.params.id;
        let newList;
        for(let i = 0; i < db.length; i++) {
            if (id == db[i].id) {
                db.splice(i,1);
            } else {
                console.log(id);
                console.log(db[i].id);
            };
        };
        newList = JSON.stringify(db);
        console.log(newList);
        updateDB(db);
        res.json(db);
        })
        
    

};