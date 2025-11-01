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
            type: DataTypes.TEXT,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false
        },
        current: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        end: {
            type: DataTypes.DATE,
            allowNull: true
        }

    });

    Experience.associate = (models) => {
        Experience.belongsTo(models.User)
    }
    return Experience;
};

export default getExperience;