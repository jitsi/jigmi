const Sequelize = require('sequelize');

module.exports = class PsnrResult extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            buildNum: { type: Sequelize.INTEGER, primaryKey: true },
            buildUrl: { type: Sequelize.STRING },
            psnrValue: { type: Sequelize.FLOAT }
        },
        { sequelize });
    }
};
