const BaseModel = require('./baseModel.js');
const Sequelize = require('sequelize');

module.exports = class FrameSkipResult extends BaseModel {
    /**
     * Initialize this model
     */
    static init(sequelize) {
        return super.init({
            frameSkipPercentage: { type: Sequelize.FLOAT }
        },
        { sequelize });
    }
};

