import Sequelize from "sequelize";
import pg from "pg"
import getUserModel from "./user.js";
import getAcademicBackground from "./academicBackground.js";
import getExperience from "./experience.js";
import getHardSkill from "./hardSkill.js";
import getSoftSkill from "./softSkill.js";
import getProject from "./project.js";
import "dotenv/config";

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 1,
    min: 0,
    idle: 10000,
    acquire: 30000
  },
  dialectModule: pg,
  logging: console.log
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  AcademicBackground: getAcademicBackground(sequelize, Sequelize),
  Experience: getExperience(sequelize, Sequelize),
  HardSkill: getHardSkill(sequelize, Sequelize),
  SoftSkill: getSoftSkill(sequelize, Sequelize),
  Projects: getProject(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;