/* global process, __dirname */

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');
const PsnrResult = require('./models/psnrResult');
const FrameSkipResult = require('./models/frameSkipResult');

const DB_LOCATION = './db';
const MODELS_PATH = './models/';

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

//TODO: generically init all models(?)
//they'd still need to be imported directly to be used
//fs.readdirSync(MODELS_PATH)
//    .filter(file => file.slice(-3) === '.js')
//    .map(file => {
//        const model = require(path.join(MODELS_PATH, file)); // erroring, unable to find file for some reason
//        model.init(sequelize);
//    });
PsnrResult.init(sequelize);
FrameSkipResult.init(sequelize);

const initializationPromise = sequelize.sync();

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

app.post('/frameSkipResult', (req, res) => {
    const { buildNum, buildUrl, frameSkipPercentage } = req.body;

    console.log(`received frame skip pct ${frameSkipPercentage}`
        + ` for build num ${buildNum}`
        + ` url ${buildUrl}`);

    FrameSkipResult.create({
        buildNum,
        buildUrl,
        frameSkipPercentage
    })
    .then((createdFrameSkipResult) => { // eslint-disable-line no-unused-vars
        res.sendStatus(200);
    })
    .catch(err => {
        console.log("Error inserting frameSkipResult: ", err);
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

app.get('/frameSkipResults', (req, res) => {
    FrameSkipResult.findAll().then(frameSkipResults => {
        console.log('got results: \n',
           frameSkipResults.map(result => result.toJSON()));
        res.send(frameSkipResults.map(result => result.toJSON()));
    })
    .catch(err => {
        console.log("Error querying psnr results");
        res.sendStatus(500);
    });
});

const port = process.env.PORT || 8000;


// Sync the db
sequelize.sync().then(() => {
    http.createServer(app).listen(port, () => {
        console.log(`Server listening on ${port}`);
    });
});
