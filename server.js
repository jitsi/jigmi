/* global process, __dirname */

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const path = require('path');
const sequelize = require('./models').sequelize;

const app = express();

app.use(bodyParser.json());
app.use('/lib', express.static('lib'));

app.get('/', (req, res) => {
    console.log(`sending ${path.join(__dirname, '/index.html')}`);
    res.sendFile(path.join(__dirname, '/index.html'));
});

require('./routes')(app, sequelize);

const port = process.env.PORT || 8000;

/**
 * Run the server
 */
async function run() {
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
