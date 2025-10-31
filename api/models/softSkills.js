const getSoftSkills = (sequelize, { DataTypes }) => {
    const SoftSkills = sequelize.define("softSkills", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    });

    SoftSkills.associate = (models) => {
        SoftSkills.belongsToMany(models.User, {
            through: 'UserSoftSkills'
        })
    }
    return SoftSkills;
};

export default getSoftSkills;