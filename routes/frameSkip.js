const FrameSkipResult = require('../models/frameSkipResult');

module.exports = function(app) {
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
        .then(createdFrameSkipResult => { // eslint-disable-line no-unused-vars
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(`Error inserting frameSkipResult: ${err}`);
            res.sendStatus(500);
        });
    });

    app.get('/frameSkipResults', (req, res) => {
        FrameSkipResult.findAll().then(frameSkipResults => {
            res.send(frameSkipResults.map(result => result.toJSON()));
        })
        .catch(err => {
            console.log(`Error querying psnr results: ${err}`);
            res.sendStatus(500);
        });
    });


};
