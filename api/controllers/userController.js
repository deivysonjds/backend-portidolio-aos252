import { Router } from "express";
import models from "../models/index.js";
import { Op } from "sequelize";
const router = Router()

router.post("/", async (req, res) => {

    let {
        name,
        email,
        contact,
        linkedin,
        github,
        website,
        academic_background,
        experience,
        HardSkill,
        SoftSkill,
        project
    } = req.body
    console.log(req.body);
    
    if (!name || !email || !contact) return res.status(400).json({ message: "Invalid parameters" })

    let user = await models.User.create({
        name: name,
        email: email,
        contact: contact,
        linkedin: linkedin,
        github: github,
        website: website,
        academic_background: academic_background,
        experience: experience,
        project: project
    },
        {
            include: [
                { model: models.Experience, as: "experience" },
                { model: models.AcademicBackground, as: "academic_background" },
                { model: models.Projects, as: "project" },
            ]
        })
        console.log("\n\nchegou aqui\n\n");
        
    if (!!HardSkill) {
            const skillNames = HardSkill.map((s) => s.name);

            const existingSkills = await models.HardSkills.findAll({
                where: { name: { [Op.in]: skillNames } },
            });
            console.log(existingSkills);
            
            const existingNames = existingSkills.map((s) => s.name);

            const newSkillsData = HardSkill.filter(
                (s) => !existingNames.includes(s.name)
            );

            let newSkills = [];
            if (newSkillsData.length > 0) {
                newSkills = await models.HardSkills.bulkCreate(newSkillsData, {
                    returning: true,
                });
            }

            const allSkills = [...existingSkills, ...newSkills];
            await user.addHardSkill(allSkills);
        }

        if (SoftSkill && SoftSkill.length > 0) {
            const skillDescriptions = SoftSkill.map((s) => s.description);

            const existingSkills = await models.SoftSkills.findAll({
                where: { description: { [Op.in]: skillDescriptions } },
            });

            const existingDescriptions = existingSkills.map((s) => s.description);

            const newSkillsData = SoftSkill.filter(
                (s) => !existingDescriptions.includes(s.description)
            );

            let newSkills = [];
            if (newSkillsData.length > 0) {
                newSkills = await models.SoftSkills.bulkCreate(newSkillsData, {
                    returning: true,
                });
            }

            const allSkills = [...existingSkills, ...newSkills];
            await user.addSoftSkill(allSkills);
        }

        const createdUser = await models.User.findOne({
            where: { id: user.id },
            include: [{ all: true, nested: true }],
        });

        return res.status(201).json(createdUser);
})

router.get("/", async (req, res) => {
    let users = await models.User.findAll({
        include: [{ all: true, nested: true }]
    })

    return res.status(200).json(users)
})

router.get("/:id", async (req, res) => {
    let id = req.params.id

    let user = await models.User.findOne({
        where: {
            id: id
        },
        include: [{ all: true, nested: true }]
    })

    if (!user) return res.status(404).json({ message: "Not found" })

    return res.status(200).json(user)
})

router.put("/:id", async (req, res) => {
    let id = req.params.id

    let user = await models.User.findOne({
        where: {
            id: id
        }
    })

    if (!user) return res.status(404).json({ message: "Not found" })

    let { name,
        email,
        contact,
        linkedin,
        github,
        website
    } = req.body

    if (!name || !email || !contact) return res.status(400).json({ message: "Invalid parameters" })

    user.name = name
    user.email = email
    user.contact = contact
    if (!!linkedin) user.linkedin = linkedin
    if (!!github) user.github = github
    if (!!website) user.website = website

    await user.save()

    return res.status(200).json(user)
})

router.delete("/:id", async (req, res) => {
    let id = req.params.id

    let user = await models.User.findOne({
        where: {
            id: id
        }
    })

    if (!user) return res.status(404).json({ message: "Not found" })

    await user.destroy()

    return res.status(204).json({ message: "User deleted" })
})

export default router;