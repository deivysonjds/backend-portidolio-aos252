const getAcademicBackground = (sequelize, { DataTypes }) => {
    const AcademicBackground = sequelize.define("academic_background", {
        courseName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        institution: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false
        }

    });

    AcademicBackground.associate = (models) => {
        AcademicBackground.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'userId'
        });
    }
    return AcademicBackground;
};

export default getAcademicBackground;