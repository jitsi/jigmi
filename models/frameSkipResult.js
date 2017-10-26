const BaseModel = require('./baseModel.js');
const Sequelize = require('sequelize');

module.exports = class FrameSkipResult extends BaseModel {
    static init(sequelize) {
        return super.init({
            frameSkipPercentage: { type: Sequelize.FLOAT }
        },
        { sequelize });
    }
};

