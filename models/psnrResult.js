const BaseModel = require('./baseModel.js');
const Sequelize = require('sequelize');

module.exports = class PsnrResult extends BaseModel {
    static init(sequelize) {
        return super.init({
            psnrValue: { type: Sequelize.FLOAT }
        },
        { sequelize });
    }
};
