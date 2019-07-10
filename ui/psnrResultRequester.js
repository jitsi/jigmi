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

const URL = './psnrResults';

module.exports = class PsnrResultRequester {

    /**
     * Fetch the psnr test result endpoint to retrieve
     * the historical data.
     *
     * @return a JSON object of the data or throws if
     * the request failed.
     */
    static async fetchPsnrResults() {
        const result = await fetch(URL);

        if (result.status !== 200) {
            throw new Error('Error retrieving PSNR result data');
        }

        return await result.json();
    }

    /**
     * This function is responsible for taking the json result
     * from a psnr test and transforming it into a format
     * to be fed into a highchart series field.  It will
     * build a series where the x axis is the jenkins build
     * number and the y axis is the psnr value for that build.
     *
     * @param {Object} jsonData - The PSNR JSON data retrieved from
     * the psnrResults endpoint
     * @returns an object suitable to be placed in a series array
     * for a highchart
     */
    static getPsnrChartData(jsonData) {
        const psnrData = jsonData.reduce((currData, currRow) => {
            currData.push([ new Date(currRow.buildDate).getTime(), currRow.psnr ]);

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
     * @param {Object} jsonData - The PSNR JSON data retrieved from
     * the psnrResults endpoint
     * @returns an object suitable to be placed in a series array
     * for a highchart
     */
    static getFrameChartData(jsonData) {
        const frameSkipData = jsonData.reduce((currData, currRow) => {
            const numerator = currRow.numSkippedFrames;
            const denominator = currRow.totalFrames;
            const value = getPercentage(numerator, denominator);

            currData.push([ new Date(currRow.buildDate).getTime(), value ]);

            return currData;
        }, []);

        const frameSkipSeries = {
            name: 'skipped frames',
            data: frameSkipData
        };

        const frameFrozenData = jsonData.reduce((currData, currRow) => {
            const numerator = currRow.numFrozenFrames;
            const denominator = currRow.totalFrames;
            const value = getPercentage(numerator, denominator);

            currData.push([ new Date(currRow.buildDate).getTime(), value ]);

            return currData;
        }, []);

        const frameFrozenSeries = {
            name: 'frozen frames',
            data: frameFrozenData
        };

        return [ frameSkipSeries, frameFrozenSeries ];
    }
};
