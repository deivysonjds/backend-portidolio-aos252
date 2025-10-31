const getHardSkills = (sequelize, { DataTypes }) => {
    const HardSkills = sequelize.define("hardSkills", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    });

    HardSkills.associate = (models) => {
        HardSkills.belongsToMany(models.User, {
            through: 'UserHardskills'
            
        })
    }
    return HardSkills;
};

export default getHardSkills;