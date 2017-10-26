var fs = require('fs');

module.exports = function (sequelize) {
    fs.readdirSync("./models")
        .filter(file => file.slice(-3) === '.js')
        .filter(file => file !== 'baseModel.js')
        .filter(file => file !== 'index.js')
        .map(file => {
            const model = require(`./${file}`);
            model.init(sequelize);
        });
};
