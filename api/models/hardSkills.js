import { where } from "sequelize";

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