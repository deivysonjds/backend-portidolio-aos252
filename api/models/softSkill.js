const getSoftSkills = (sequelize, { DataTypes }) => {
    const SoftSkills = sequelize.define("SoftSkill", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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