const PsnrResult = require('../models/psnrResult');

module.exports = function(app) {
    app.post('/psnrResult', (req, res) => {
        const {
            buildNum,
            buildUrl,
            psnr,
            numFrozenFrames,
            numSkippedFrames,
            totalFrames
        } = req.body;

        console.log(`received psnr ${psnr},`
            + ` numFrozenFrames ${numFrozenFrames},`
            + ` numSkippedFrames ${numSkippedFrames},`
            + ` totalFrames ${totalFrames},`
            + ` for build num ${buildNum}`
            + ` url ${buildUrl}`);

        PsnrResult.create({
            buildNum,
            buildUrl,
            psnr,
            numFrozenFrames,
            numSkippedFrames,
            totalFrames
        })
        .then(createdPsnrResult => { // eslint-disable-line no-unused-vars
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(`Error inserting psnrResult: ${err}`);
            res.sendStatus(500);
        });
    });

    app.get('/psnrResults', (req, res) => {
        PsnrResult.findAll().then(psnrResults => {
            res.send(psnrResults.map(result => result.toJSON()));
        })
        .catch(err => {
            console.log(`Error querying psnr results: ${err}`);
            res.sendStatus(500);
        });
    });
};
