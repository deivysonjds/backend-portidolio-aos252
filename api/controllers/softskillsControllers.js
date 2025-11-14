import { Router } from "express";
import models from "../models/index.js";
const router = Router()

router.post("/", async (req, res) => {
    let { userId } = req.query

    let {
        description
    } = req.body

    if (!description) return res.status(400).json({ message: "Invalid parameters" })

    if (!!userId) {

        let user = await models.User.findByPk(userId)

        if (!user) return res.status(404).json({ message: "User not found" })

        let existsSoftskill = await models.SoftSkills.findOne({
            where: {
                description: description
            }
        })

        if(!existsSoftskill) existsSoftskill = await models.SoftSkills.create({description: description})
        
        await user.addSoftSkill(existsSoftskill)

        return res.status(201).json(existsSoftskill)
    }

    let softskill = await models.SoftSkills.create({description: description})
        
    return res.status(201).json(softskill)
})

router.get("/", async (req, res) => {

    let { userId } = req.query

    if (!userId) {
        let softSkill = await models.SoftSkills.findAll()

        return res.status(200).json(softSkill)
    }

    let user = await models.User.findByPk(userId, {
        include: [
            {
                model: models.SoftSkills,
                as: 'SoftSkill',
                through: { attributes: [] }
            }
        ]
    })

    if (!user) return res.status(404).json({ message: "Not found" })

    let softSkillsByUser = await user.getSoftSkill()

    return res.status(200).json(softSkillsByUser)
})

router.get("/:id", async (req, res) => {
    let id = req.params.id

    let hardskill = await models.SoftSkills.findOne({
        where: {
            id: id
        }
    })

    if (!hardskill) return res.status(404).json({ message: "Not found" })

    return res.status(200).json(hardskill)
})

router.put("/:id", async (req, res) => {
    let id = req.params.id

    let hardskill = await models.SoftSkills.findOne({
        where: {
            id: id
        }
    })

    if (!hardskill) return res.status(404).json({ message: "Not found" })

    let {
        description
    } = req.body

    if (!description) return res.status(400).json({ message: "Invalid parameters" })

    hardskill.description = description

    await hardskill.save()

    return res.status(200).json(hardskill)
})

router.delete("/:id", async (req, res) => {
    let id = req.params.id

    let hardSkill = await models.SoftSkills.findOne({
        where: {
            id: id
        }
    })

    if (!hardSkill) return res.status(404).json({ message: "Not found" })

    await hardSkill.destroy()

    return res.status(204).json({ message: "HardSkill deleted" })
})

export default router;