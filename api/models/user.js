const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    }

  });

  User.associate = (models)=>{
    User.hasMany(models.AcademicBackground, {
      as: "academic_background",
      onDelete: 'CASCADE'
    })
    User.hasMany(models.Experience, {
      as: 'experience',
      onDelete: 'CASCADE'
    });
    User.belongsToMany(models.HardSkills, {
        through: 'UserHardSkills',
        as: 'HardSkill',
        foreignKey: 'userId'
    })
    User.belongsToMany(models.SoftSkills, {
        through: 'UserSoftSkills',
        as: 'SoftSkill',
        foreignKey: 'userId'
    });
  }

  return User;
};

export default getUserModel;