const getProject = (sequelize, { DataTypes }) => {
    const Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Project;
};

export default getProject;