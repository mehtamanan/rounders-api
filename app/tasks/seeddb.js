let path = require('path');

let { executeScript } = require('../db');

executeScript(path.join(__dirname, '..', 'db', 'seed.psql'))
    .then(() => {
        console.log("successfully initiated db...");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(2);
    });
