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
        const psnrDataByProject = {};

        jsonData.forEach(currData => {
            const {
                projectName,
                buildDate,
                psnr
            } = currData;

            if (!(projectName in psnrDataByProject)) {
                psnrDataByProject[projectName] = [];
            }
            psnrDataByProject[projectName].push([ new Date(buildDate).getTime(), psnr ]);
        });

        const results = [];

        Object.entries(psnrDataByProject).forEach(entry => {
            results.push({
                name: entry[0],
                data: entry[1]
            });
        });

        return results;
    }

    /**
     * A helper method to extract data from the overall frame date.
     *
     * @param jsonData {Array} the raw frame data
     * @param valueProcessingFunc {Function} a function which will take in
     * a 'row' of the JSON data and return a desired 'value' for the chart
     * @returns {Object} an object of the following format:
     * {
     *      projectName1: [ [x value 1, y value 1], [x value 2, y value 2]... ],
     *      projectName2: [ [x value 1, y value 1], [x value 2, y value 2]... ],
     * }
     */
    static _getFrameChartDataHelper(jsonData, valueProcessingFunc) {
        const frameDataByProject = {};

        jsonData.forEach(currData => {
            const {
                projectName,
                buildDate
            } = currData;
            const value = valueProcessingFunc(currData);

            if (!(projectName in frameDataByProject)) {
                frameDataByProject[projectName] = [];
            }
            frameDataByProject[projectName].push([ new Date(buildDate).getTime(), value ]);
        });

        return frameDataByProject;
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
        const frameSkipDataByProject = PsnrResultRequester._getFrameChartDataHelper(
            jsonData,
            currData => {
                const numerator = currData.numSkippedFrames;
                const denominator = currData.totalFrames;

                return getPercentage(numerator, denominator);
            }
        );

        const frameFrozenDataByProject = PsnrResultRequester._getFrameChartDataHelper(
            jsonData,
            currData => {
                const numerator = currData.numFrozenFrames;
                const denominator = currData.totalFrames;

                return getPercentage(numerator, denominator);
            }
        );

        const results = [];

        Object.entries(frameSkipDataByProject).forEach(entry => {
            results.push({
                name: `${entry[0]}-skipped frames`,
                data: entry[1]
            });
        });

        Object.entries(frameFrozenDataByProject).forEach(entry => {
            results.push({
                name: `${entry[0]}-frozen frames`,
                data: entry[1]
            });
        });

        return results;
    }
};
