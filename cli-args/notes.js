const fs = require("fs");
const chalk = require('chalk')

const getNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(chalk.green.inverse(note.title));
        console.log(chalk.green.inverse(note.body));
    } else {
        console.log(chalk.red.inverse(`Note not found: ${title}`));
    }
}

const deleteNote = (title) => {
    const notes = loadNotes();
    const persistentNotes = notes.filter(function (note) {
        return note.title !== title;
    });

    if (notes.length === persistentNotes.length) {
        console.log(chalk.red.inverse(`Note not found: ${title}`));
    } else {
        saveNotes(persistentNotes);
        console.log(chalk.green.inverse(`Note deleted: ${title}`));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicteNotes = notes.filter(function (note) {
        return note.title === title;
    });

    if (duplicteNotes.length > 0) {
        console.log(chalk.red.inverse(`Duplicated note title: ${title}`));
        return;
    }

    notes.push({
        title, body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse(`Note added: ${title, body}`));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();

    debugger

    console.log(chalk.inverse("Your notes"));
    notes.forEach((note) => {
        console.log(note.title);
    })
}

module.exports = {
    get: getNote,
    add: addNote,
    del: deleteNote,
    list: listNotes
}
