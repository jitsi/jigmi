/**
 * This function is responsible for taking the json result
 * from a psnr test and transforming it into a format
 * to be fed into a highchart series field.  It will
 * build a series where the x axis is the jenkins build
 * number and the y axis is a configured value (set
 * by numeratorFieldName).  It calculates the value
 * as a percentage of the total frames captured in
 * the test.
 *
 * @param json the json result data from the psnr test
 * @param numeratorFieldName the field for which to calculate
 * as a percentage of the total frames.  Since there are two
 * fields we want series for, we take this in as a variable so
 * the method is reusable
 *
 * @returns an object suitable to be placed in a series array
 * for a highchart
 */
export default (json, numeratorFieldName) => {
    const frameData = json.reduce((currData, currRow) => {
        const numeratorValue = currRow[numeratorFieldName];
        const denominatorValue = currRow.totalFrames;
        const value = numeratorValue / denominatorValue;

        currData.push([ currRow.buildNum, value ]);

        return currData;
    }, []);

    return {
        name: numeratorFieldName,
        data: frameData
    };
};
