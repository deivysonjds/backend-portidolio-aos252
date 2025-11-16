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

  User.associate = (models) => {
    User.hasMany(models.AcademicBackground, {
      as: "academic_background",
      onDelete: 'CASCADE'
    })
    User.hasMany(models.Experience, {
      as: 'experience',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Project, {
      as: 'projects',
      onDelete: 'CASCADE'
    });
    User.belongsToMany(models.HardSkill, {
      through: 'UserHardSkills',
      as: 'hardSkills',
      foreignKey: 'userId'
    });

    User.belongsToMany(models.SoftSkill, {
      through: 'UserSoftSkills',
      as: 'softSkills',
      foreignKey: 'userId'
    });
  }

  return User;
};

export default getUserModel;