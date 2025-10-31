const getExperience = (sequelize, { DataTypes }) => {
    const Experience = sequelize.define("experience", {
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enterprise: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.DATE,
            allowNull: false
        }

    });

    Experience.associate = (models) => {
        Experience.belongsTo(models.User)
    }
    return Experience;
};

export default getExperience;