import "dotenv/config";
import express from "express";
import {sequelize} from "./models/index.js"
import seedInDataBase from "./service/seed.js";
import {
  userController,
  experienceController,
  academicBackgroundController,
  hardskillsController,
  softskillsController,
  projectController
} from "./controllers/index.js"

const app = express();
app.set("trust proxy", true);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userController)
app.use("/projects", projectController)
app.use("/experiences", experienceController)
app.use("/academics", academicBackgroundController)
app.use("/hardskills", hardskillsController)
app.use("/softskills", softskillsController)

// const port = process.env.PORT ?? 3000;

// const eraseDatabaseOnSync = process.env.ERASE_DATABASE === "true";

// sequelize.sync({force: eraseDatabaseOnSync}).then(async () => {
//   if (eraseDatabaseOnSync) {
//     await seedInDataBase()
//   }
  
//   app.listen(port, () => {
//     console.log(`Server is running in http://localhost:${port} !`);
//   });
// });
// app.listen(port, () => {
//   console.log(`Server is running in http://localhost:${port} !`);
// });

export default app;