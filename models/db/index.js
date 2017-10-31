const fs = require('fs');

module.exports = function(sequelize) {
    fs.readdirSync('./models/db')
        .filter(file => file.slice(-3) === '.js')
        .filter(file => file !== 'baseModel.js')
        .filter(file => file !== 'index.js')
        .forEach(file => {
            const model = require(`./${file}`);

            model.init(sequelize);
        });
};
