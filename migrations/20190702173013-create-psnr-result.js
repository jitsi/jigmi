module.exports = {
    // eslint-disable-next-line arrow-body-style
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PsnrResults', {
            buildNum: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            buildUrl: {
                type: Sequelize.STRING
            },
            psnr: {
                type: Sequelize.FLOAT
            },
            numFrozenFrames: {
                type: Sequelize.INTEGER
            },
            numSkippedFrames: {
                type: Sequelize.INTEGER
            },
            totalFrames: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('PsnrResults')
};
