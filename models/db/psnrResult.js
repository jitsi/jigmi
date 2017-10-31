const BaseModel = require('./baseModel.js');
const Sequelize = require('sequelize');

module.exports = class PsnrResult extends BaseModel {
    /**
     * Initialize this model
     */
    static init(sequelize) {
        return super.init(
            {
                psnr: {
                    type: Sequelize.FLOAT
                },
                numFrozenFrames: {
                    type: Sequelize.INTEGER
                },
                numSkippedFrames: {
                    type: Sequelize.INTEGER
                },
                totalFrames: {
                    type: Sequelize.INTEGER
                }
            },
            {
                sequelize
            }
        );
    }
};
