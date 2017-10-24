const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const sqlite3 = require('sqlite3');

const app = express();
app.use(bodyParser.json());

DB_LOCATION="./db"

if (!fs.existsSync(DB_LOCATION)) {
    fs.mkdirSync(DB_LOCATION);
}

var db = new sqlite3.Database("./db/dashboard.db", (err) => {
    if (err) {
        console.log("Error connecting to database: " + err);
    } else {
        console.log("Connected to database");
    }
});

// Initialize database
//   create psnr table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE if not exists psnr " +
        "(buildNum INTEGER PRIMARY KEY, " +
         "buildUrl TEXT, " +
         "psnr NUMERIC, " +
         "timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
});
// End initialize database

app.use('/lib', express.static('lib'));

app.get('/', (req, res) => {
    console.log("sending " + path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/psnrResult', (req, res) => {
    const { buildNum, buildUrl, psnrValue } = req.body;
    console.log("received psnr " + psnrValue +
        " for build num " + buildNum +
        " url " + buildUrl);

    db.serialize(() => {
        db.run("INSERT INTO psnr " +
                "(buildNum, buildUrl, psnr) VALUES(?, ?, ?)",
                [ buildNum, buildUrl, psnrValue ],
                (err) => {
                    if (err) {
                        console.log("Error inserting psnrResult: ", err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
        });
    });
});

app.get('/psnrResults', (req, res) => {
    db.serialize(() => {
        db.all("SELECT * FROM psnr", (err, rows) => {
            if (err) {
                console.log("Error getting psnr values");
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
});

const port = process.env.PORT || 8000;
http.createServer(app).listen(port, () => {
    console.log("Server listening on " + port);
});
