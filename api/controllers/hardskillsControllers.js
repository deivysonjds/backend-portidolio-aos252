import { Router } from "express";
import models from "../models/index.js";
const router = Router()

router.post("/", async (req, res) => {
    let { userId } = req.query

    let {
        name
    } = req.body

    if (!name) return res.status(400).json({ message: "Invalid parameters" })

    if (!!userId) {

        let user = await models.User.findByPk(userId)

        if (!user) return res.status(404).json({ message: "User not found" })

        let existsHardskill = await models.HardSkill.findOne({
            where: {
                name: name
            }
        })

        if(!existsHardskill) existsHardskill = await models.HardSkill.create({name: name})
        
        await user.addHardSkill(existsHardskill)

        return res.status(201).json(existsHardskill)
    }

    let hardskill = await models.HardSkill.create({name: name})
        
    return res.status(201).json(hardskill)
})

router.get("/", async (req, res)=>{

    let {userId} = req.query

    if (!userId) {
        let hardskills = await models.HardSkill.findAll()

        return res.status(200).json(hardskills)
    }

    let user = await models.User.findByPk(userId,{
        include: [
            {
                model: models.HardSkill,
                as: 'hardSkills',
                through: { attributes: [] }
            }
        ]
    })

    if(!user) return res.status(404).json({message: "Not found"})

    let hardskillsByUser = await user.getHardSkills()

    return res.status(200).json(hardskillsByUser)
})

router.get("/:id", async (req, res)=>{
    let id = req.params.id

    let hardskill = await models.HardSkill.findOne({
        where: {
            id: id
        }
    })

    if(!hardskill) return res.status(404).json({message:"Not found"})

    return res.status(200).json(hardskill)
})

router.put("/:id", async (req, res)=>{
    let id = req.params.id

    let hardskill = await models.HardSkill.findOne({
        where: {
            id: id
        }
    })

    if(!hardskill) return res.status(404).json({message: "Not found"})
    
    let {
        name
    } = req.body

    if(!name) return res.status(400).json({message: "Invalid parameters"})
    
    hardskill.name = name

    await hardskill.save()

    return res.status(200).json(hardskill)
})

router.delete("/:id", async(req, res)=>{
    let id = req.params.id

    let hardSkill = await models.HardSkill.findOne({
        where: {
            id: id
        }
    })

    if(!hardSkill) return res.status(404).json({message: "Not found"})
    
    await hardSkill.destroy()

    return res.status(204).json({message: "HardSkill deleted"})
})

export default router;