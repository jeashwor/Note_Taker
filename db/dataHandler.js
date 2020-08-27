const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

const addID = () => {
    readFileAsync("./db/db.json", (err, data) => {
        if (err) throw err;
        // console.log(data);
        return data;
    }).then((data) => {
        let notesList = JSON.parse(data);
        for (let i = 0; i < notesList.length; i++) {
            notesList[i].id = i;
        }
        let notesListID = JSON.stringify(notesList);
        fs.writeFile("./db/db.json", notesListID, (err) => {
            if (err) throw err;
            console.log("New file with IDs has been saved.");
        });
    });
};

// const updateDB = (db) => {
//     const newList = JSON.stringify(db);
//     fs.writeFile("./db/db.json", newList, (err) => {
//         if (err) throw err;
//         console.log("File has been updated.");
//     });
// }


module.exports = addID;
// module.exports = updateDB;