import Sequelize from "sequelize";
import pg from "pg"
import getUserModel from "./user.js";
import getAcademicBackground from "./academicBackground.js";
import getExperience from "./experience.js";
import "dotenv/config";
import getHardSkills from "./hardSkills.js";
import getSoftSkills from "./softSkills.js";

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: pg,
  logging: console.log
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  AcademicBackground: getAcademicBackground(sequelize, Sequelize),
  Experience: getExperience(sequelize, Sequelize),
  HardSkills: getHardSkills(sequelize, Sequelize),
  SoftSkills: getSoftSkills(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;