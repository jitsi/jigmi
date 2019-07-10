/*
 * Change the primary key from the buildNum field to a new
 * 'id' field (which matches the default field sequelize
 * creates if no primary key is set).
 */
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn(
        'PsnrResults',
        'id',
        {
            type: Sequelize.INTEGER,
            autoIncrement: true
        }
    )
    .then(() => queryInterface.changeColumn(
        'PsnrResults',
        'buildNum',
        {
            type: Sequelize.INTEGER,
            primaryKey: false
        }
    ))
    .then(() => queryInterface.changeColumn(
        'PsnrResults',
        'id',
        {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    )),

    down: (queryInterface, Sequelize) => queryInterface.changeColumn(
        'PsnrResults',
        'id',
        {
            type: Sequelize.INTEGER,
            primaryKey: false
        }
    )
    .then(() => queryInterface.changeColumn(
        'PsnrResults',
        'buildNum',
        {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    ))
    .then(() => queryInterface.removeColumn('PsnrResults', 'buildNum'))
};
