const yargs = require('yargs');
const notes = require('./notes.js');
//const cli = yargs.argv;

// custom version
yargs.version('1.0.1');

// add command
yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string',
            demand: true
        },
        body: {
            describe: 'Note body',
            type: 'string',
            demand: true
        }
    },
    handler(argv) {
        notes.add(argv.title, argv.body);
    }
});

// remove command
yargs.command({
    command: 'del',
    describe: 'Del note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string',
            demand: true
        },
    },
    handler(argv) {
        notes.del(argv.title);
    }
});

// list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        notes.list();
    }
});

// get command
yargs.command({
    command: 'get',
    describe: 'Get note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string',
            demand: true
        },
    },
    handler(argv) {
        notes.get(argv.title);
    }
});

// end of file
yargs.parse();
