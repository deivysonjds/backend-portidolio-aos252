const getSoftSkill = (sequelize, { DataTypes }) => {
    const SoftSkill = sequelize.define("SoftSkill", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    });

    SoftSkill.associate = (models) => {
        SoftSkill.belongsToMany(models.User, {
            through: 'UserSoftSkills',
            as: 'users',
            foreignKey: 'softSkillId'
        });
    }
    return SoftSkill;
};

export default getSoftSkill;