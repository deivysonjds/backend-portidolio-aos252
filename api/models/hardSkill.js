
const getHardSkill = (sequelize, { DataTypes }) => {
    const HardSkill = sequelize.define("HardSkill", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    });

    HardSkill.associate = (models) => {
        HardSkill.belongsToMany(models.User, {
            through: 'UserHardSkills',
            as: 'users',
            foreignKey: 'hardSkillId'
        });
    }

    HardSkill.findByName = async (name) => {
        let hardSkill = await HardSkill.findOne({
            where: {
                name: name
            }
        })

        return hardSkill
    }
    return HardSkill;
};

export default getHardSkill;