module.exports = {
    // We can't make the buildDate field non-null to start,
    // because then we'd need to fill out a value but we
    // don't know the correct value here (it's based on
    // the value of another column which we don't have access
    // to here), so first add it as nullable, then update the
    // fields to the proper values, then come back and make
    // it non-null.
    up: (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;

        return queryInterface.addColumn(
            'PsnrResults',
            'buildDate',
            {
                type: Sequelize.DATE
            }
        )
        .then(() => sequelize.define('PsnrResult', {
            buildDate: Sequelize.DATE
        }))
        .then(() => sequelize.models.PsnrResult.findAll())
        .then(psnrResults => Promise.all(psnrResults.map(psnrResult =>
            psnrResult.set('buildDate', psnrResult.createdAt).save())
        ))
        .then(() => queryInterface.changeColumn(
            'PsnrResults',
            'buildDate',
            {
                type: Sequelize.DATE,
                allowNull: false
            }
        ));
    },

    down: queryInterface => queryInterface.removeColumn(
        'PsnrResults',
        'buildDate'
    )
};

