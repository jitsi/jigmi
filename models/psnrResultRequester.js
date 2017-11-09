/**
 * Get a percentage value from a numerator, denominator and a precision
 * value
 * @param {Number} numerator
 * @param {Number} denominator
 * @param {Number} precision the amount of decimal places
 * @return {Number} a percentage
 */
function getPercentage(numerator, denominator, precision = 2) {
    return parseFloat(((numerator / denominator) * 100).toFixed(precision));
}

module.exports = class PsnrResultRequester {
    /**
     * Constructor
     */
    constructor() {
        this.url = './psnrResults';
    }

    /**
     * Fetch the psnr test result endpoint to retrieve
     * the historical date
     */
    fetch() {
        return new Promise((resolve, reject) => {
            fetch(this.url)
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(jsonData => {
                            this.jsonData = jsonData;
                            resolve();
                        });
                    } else {
                        reject();
                    }
                });
        });
    }

    /**
     * This function is responsible for taking the json result
     * from a psnr test and transforming it into a format
     * to be fed into a highchart series field.  It will
     * build a series where the x axis is the jenkins build
     * number and the y axis is the psnr value for that build.
     *
     * @returns an object suitable to be placed in a series array
     * for a highchart
     */
    getPsnrChartData() {
        const psnrData = this.jsonData.reduce((currData, currRow) => {
            currData.push([ currRow.buildNum, currRow.psnr ]);

            return currData;
        }, []);

        return [
            {
                name: 'psnr',
                data: psnrData
            }
        ];
    }

    /**
     * This function is responsible for taking the json result
     * from a psnr test and transforming it into a format
     * to be fed into a highchart series field.  It will
     * build 2 different series, both where the x axis is the
     * jenkins build number and:
     * 1) where the y axis is the percent of skipped frames
     * 2) where the y axis is the percent of frozen frames
     *
     * @returns an object suitable to be placed in a series array
     * for a highchart
     */
    getFrameChartData() {
        const frameSkipData = this.jsonData.reduce((currData, currRow) => {
            const numerator = currRow.numSkippedFrames;
            const denominator = currRow.totalFrames;
            const value = getPercentage(numerator, denominator);

            currData.push([ currRow.buildNum, value ]);

            return currData;
        }, []);

        const frameSkipSeries = {
            name: 'skipped frames',
            data: frameSkipData
        };

        const frameFrozenData = this.jsonData.reduce((currData, currRow) => {
            const numerator = currRow.numFrozenFrames;
            const denominator = currRow.totalFrames;
            const value = getPercentage(numerator, denominator);

            currData.push([ currRow.buildNum, value ]);

            return currData;
        }, []);

        const frameFrozenSeries = {
            name: 'frozen frames',
            data: frameFrozenData
        };

        return [ frameSkipSeries, frameFrozenSeries ];
    }
};
