const db = require("../db/db.json")

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(db);
    });

    app.post("/api/tables", function (req, res) {
        db.push(req.body);
    });

};