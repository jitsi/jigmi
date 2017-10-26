const BaseModel = require('./baseModel.js');
const Sequelize = require('sequelize');

module.exports = class PsnrResult extends BaseModel {
    /**
     * Initialize this model
     */
    static init(sequelize) {
        return super.init(
            {
                psnrValue: {
                    type: Sequelize.FLOAT
                }
            },
            {
                sequelize
            }
        );
    }
};
