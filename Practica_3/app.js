const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.1.0');

// Comando para agregar nota
yargs.command({
    command: 'add',
    describe: 'Agregar una nueva nota',
    builder: {
        title: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Contenido de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// Comando para eliminar nota
yargs.command({
    command: 'remove',
    describe: 'Eliminar una nota',
    builder: {
        title: {
            describe: 'Título de la nota a eliminar',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

// Comando para listar notas
yargs.command({
    command: 'list',
    describe: 'Listar todas las notas',
    handler() {
        notes.listNotes();
    }
});

// Comando para consultar una nota
yargs.command({
    command: 'read',
    describe: 'Consultar una nota',
    builder: {
        title: {
            describe: 'Título de la nota a consultar',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

yargs.parse();