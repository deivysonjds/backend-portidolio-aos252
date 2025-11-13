const getProject = (sequelize, { DataTypes }) => {
    const Project = sequelize.define("project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Project.associate = (models) => {
        Project.belongsTo(models.User)
    }

    return Project;
};

export default getProject;