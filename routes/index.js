/* global __dirname */

const fs = require('fs');

module.exports = function(app) {
    fs.readdirSync(__dirname)
        .filter(file => file.slice(-3) === '.js')
        .filter(file => file !== 'index.js')
        .map(file => file.substr(0, file.indexOf('.')))
        .map(name => require(`./${name}`)(app));
};
