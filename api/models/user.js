const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
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
      onDelete: 'CASCADE'
    })
    User.hasMany(models.Experience, {
      onDelete: 'CASCADE'
    })
    User.belongsToMany(models.HardSkills, {
        through: 'UserHardSkills'
    })
    User.belongsToMany(models.SoftSkills, {
        through: 'UserSoftSkills'
    })
  }

  return User;
};

export default getUserModel;