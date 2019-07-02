module.exports = (sequelize, DataTypes) => {
    const PsnrResult = sequelize.define('PsnrResult', {
        buildNum: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        buildUrl: DataTypes.STRING,
        psnr: DataTypes.FLOAT,
        numFrozenFrames: DataTypes.INTEGER,
        numSkippedFrames: DataTypes.INTEGER,
        totalFrames: DataTypes.INTEGER
    }, {});

    PsnrResult.associate = function(/* models */) {
        // associations can be defined here
    };

    return PsnrResult;
};
