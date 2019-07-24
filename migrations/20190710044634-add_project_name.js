module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn(
        'PsnrResults',
        'projectName',
        {
            type: Sequelize.STRING,
            defaultValue: 'jvb_1.0'
        }
    ),

    down: queryInterface => queryInterface.removeColumn('PsnrResults', 'prrojectName')
};
