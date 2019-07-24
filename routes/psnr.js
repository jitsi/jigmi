module.exports = function(app, sequelize) {
    const PsnrResult = sequelize.models.PsnrResult;

    // eslint-disable-next-line space-before-function-paren
    app.post('/psnrResult', async (req, res) => {
        const {
            buildNum,
            buildUrl,
            buildDate,
            projectName,
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
            + ` url ${buildUrl} project ${projectName} on`
            + ` ${buildDate}`);

        try {
            await PsnrResult.create({
                buildNum,
                buildUrl,
                buildDate,
                projectName,
                psnr,
                numFrozenFrames,
                numSkippedFrames,
                totalFrames
            });
            res.sendStatus(200);
        } catch (err) {
            console.log(`Error inserting psnrResult: ${err}`);
            res.sendStatus(500);
        }
    });

    // eslint-disable-next-line space-before-function-paren
    app.get('/psnrResults', async (req, res) => {
        try {
            const psnrResults = await PsnrResult.findAll({
                order: sequelize.col('buildDate')
            });

            res.send(psnrResults.map(result => result.toJSON()));
        } catch (err) {
            console.log(`Error querying psnr results: ${err}`);
            res.sendStatus(500);
        }
    });
};
