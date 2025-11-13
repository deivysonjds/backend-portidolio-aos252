
const getHardSkills = (sequelize, { DataTypes }) => {
    const HardSkills = sequelize.define("HardSkill", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    });

    HardSkills.associate = (models) => {
        HardSkills.belongsToMany(models.User, {
            through: 'UserHardSkills',
            as: 'users',
            foreignKey: 'hardSkillId'
        });
    }

    HardSkills.findByName = async (name)=>{
        let hardSkill = await HardSkills.findOne({
            where: {
                name: name
            }
        })

        return hardSkill
    }
    return HardSkills;
};

export default getHardSkills;