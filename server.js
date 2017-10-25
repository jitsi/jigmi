/* global process, __dirname */

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');

const DB_LOCATION = './db';

if (!fs.existsSync(DB_LOCATION)) {
    fs.mkdirSync(DB_LOCATION);
}

const sequelize = new Sequelize('dashboard', null, null, {
    dialect: 'sqlite',
    storage: path.join(DB_LOCATION, 'sequelize.db'),
    // https://github.com/sequelize/sequelize/issues/8417#issuecomment-337884136
    operatorsAliases: Sequelize.Op
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Successfully connected to db");
    })
    .catch(err => {
        console.log("Error connecting to db: ", err);
    });

// Sequelize automatically adds 'createdat' and 'updatedat' fields:
// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#timestamps
// but keep in mind we'll need to handle those fields on our own if we
// add a migration
const PsnrResult = sequelize.define('psnrResult', {
    buildNum: { type: Sequelize.INTEGER, primaryKey: true },
    buildUrl: { type: Sequelize.STRING },
    psnrValue: { type: Sequelize.FLOAT }
});

// If we need to sync other tables in the future we can
// chain them here
const initializationPromise = PsnrResult.sync();

const app = express();

app.use(bodyParser.json());

app.use('/lib', express.static('lib'));

app.get('/', (req, res) => {
    console.log(`sending ${path.join(__dirname, '/index.html')}`);
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/psnrResult', (req, res) => {
    const { buildNum, buildUrl, psnrValue } = req.body;

    console.log(`received psnr ${psnrValue}`
        + ` for build num ${buildNum}`
        + ` url ${buildUrl}`);

    PsnrResult.create({
        buildNum,
        buildUrl,
        psnrValue
    })
    .then((createdPsnrResult) => { // eslint-disable-line no-unused-vars
        res.sendStatus(200);
    })
    .catch(err => {
        console.log("Error inserting psnrResult: ", err);
        res.sendStatus(500);
    });
});

app.get('/psnrResults', (req, res) => {
    PsnrResult.findAll().then(psnrResults => {
        console.log('got results: \n',
           psnrResults.map(result => result.toJSON()));
        res.send(psnrResults.map(result => result.toJSON()));
    })
    .catch(err => {
        console.log("Error querying psnr results");
        res.sendStatus(500);
    });
});

const port = process.env.PORT || 8000;

initializationPromise.then(() => {
    http.createServer(app).listen(port, () => {
        console.log(`Server listening on ${port}`);
    });
});
