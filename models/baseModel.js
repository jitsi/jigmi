const Sequelize = require('sequelize');

// Sequelize automatically adds 'createdat' and 'updatedat' fields:
// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#timestamps
// but keep in mind we'll need to handle those fields on our own if we
// add a migration
module.exports = class BaseModel extends Sequelize.Model {
    static init(childCols, sequelize) {
        const baseCols = {
            buildNum: { type: Sequelize.INTEGER, primaryKey: true },
            buildUrl: { type: Sequelize.STRING }
        }
        const allCols = Object.assign(baseCols, childCols);
        return super.init(allCols, sequelize);
    }
};
