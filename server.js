/* global process, __dirname */

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const Sequelize = require('sequelize');

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

require('./models/db')(sequelize);

const app = express();

app.use(bodyParser.json());
app.use('/lib', express.static('lib'));

app.get('/', (req, res) => {
    console.log(`sending ${path.join(__dirname, '/index.html')}`);
    res.sendFile(path.join(__dirname, '/index.html'));
});

require('./routes')(app);

const port = process.env.PORT || 8000;

/**
 * Run the server
 */
async function run() {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to db');
    } catch (err) {
        console.log(`Error connecting to db: ${err}`);

        return;
    }

    // Sync the db
    try {
        await sequelize.sync();
        http.createServer(app).listen(port, () => {
            console.log(`Server listening on ${port}`);
        });
    } catch (err) {
        console.log(`Error syncing db: ${err}`);
    }
}

run();
