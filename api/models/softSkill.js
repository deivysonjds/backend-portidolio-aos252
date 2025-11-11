const getSoftSkills = (sequelize, { DataTypes }) => {
    const SoftSkills = sequelize.define("SoftSkill", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });

    SoftSkills.associate = (models) => {
        SoftSkills.belongsToMany(models.User, {
            through: 'UserSoftSkills',
            as: 'users',
            foreignKey: 'softSkillId'
        });
    }
    return SoftSkills;
};

export default getSoftSkills;