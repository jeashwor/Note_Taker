const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

// create function to add unique id to db items if they don't exist.
const addID = () => {
    readFileAsync("./db/db.json", (err, data) => {
        if (err) throw err;
        // console.log(data);
        return data;
    }).then((data) => {
        let notesList = JSON.parse(data);
        for (let i = 0; i < notesList.length; i++) {
            notesList[i].id = i++;
        }
        let notesListID = JSON.stringify(notesList);
        fs.writeFile("./db/db.json", notesListID, (err) => {
            if (err) throw err;
            console.log("New file with IDs has been saved.");
        });
    });
};


module.exports = addID;
