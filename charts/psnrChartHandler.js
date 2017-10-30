/**
 * This function is responsible for taking the json result
 * from a psnr test and transforming it into a format
 * to be fed into a highchart series field.  It will
 * build a series where the x axis is the jenkins build
 * number and the y axis is the psnr value for that build.
 *
 * @param json the json result data from the psnr test
 *
 * @returns an object suitable to be placed in a series array
 * for a highchart
 */
export default json => {
    const psnrData = json.reduce((currData, currRow) => {
        currData.push([ currRow.buildNum, currRow.psnr ]);

        return currData;
    }, []);

    return {
        name: 'psnr',
        data: psnrData
    };
};
