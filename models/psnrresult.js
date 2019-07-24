module.exports = (sequelize, DataTypes) => {
    const PsnrResult = sequelize.define('PsnrResult', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        buildNum: DataTypes.INTEGER,
        buildUrl: DataTypes.STRING,
        psnr: DataTypes.FLOAT,
        numFrozenFrames: DataTypes.INTEGER,
        numSkippedFrames: DataTypes.INTEGER,
        totalFrames: DataTypes.INTEGER,
        buildDate: DataTypes.DATE,
        projectName: DataTypes.STRING
    }, {});

    PsnrResult.associate = function(/* models */) {
        // associations can be defined here
    };

    return PsnrResult;
};
