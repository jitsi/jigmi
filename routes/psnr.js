const PsnrResult = require('../models/psnrResult');

module.exports = function(app) {
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
};
