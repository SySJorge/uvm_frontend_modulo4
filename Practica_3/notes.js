const fs = require('fs');

const getNotes = () => {
    return 'Aplicación de notas con Node.js';
};

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log('Nota agregada correctamente.');
    } else {
        console.log('Ya existe una nota con ese título.');
    }
};

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log('Nota eliminada correctamente.');
    } else {
        console.log('No se encontró una nota con ese título.');
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log('Tus notas:');

    notes.forEach((note) => {
        console.log('- ' + note.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log('Título: ' + note.title);
        console.log('Contenido: ' + note.body);
    } else {
        console.log('No se encontró una nota con ese título.');
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes, null, 2);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
};