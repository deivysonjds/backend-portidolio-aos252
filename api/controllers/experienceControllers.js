import { Router } from "express";
import models from "../models/index.js";
const router = Router()

router.get("/", async (req, res)=>{
    let {userId} = req.query

    if(!userId) return res.status(400).json({message: "Invalid parameters"})
    
    let experience = await models.Experience.findAll({
        where: {
            userId: userId
        }
    })

    return res.status(200).json(experience)
})

router.get("/:id", async (req, res)=>{
    let id = req.params.id

    let experience = await models.Experience.findOne({
        where: {
            id: id
        }
    })

    if(!experience) return res.status(404).json({message:"Not found"})

    return res.status(200).json(experience)
})

router.put("/:id", async (req, res)=>{
    let id = req.params.id

    let experience = await models.Experience.findOne({
        where: {
            id: id
        }
    })

    if(!experience) return res.status(404).json({message: "Not found"})
    
    let {
        position,
        enterprise,
        description,
        start,
        current,
        end
    } = req.body
    let {userId} = req.query

    if(!position || !enterprise || !description || !start || !current || !userId) return res.status(400).json({message: "Invalid parameters"})
    
    experience.position = position
    experience.enterprise = enterprise
    experience.description = description
    experience.start = start
    experience.current = current
    if(!!end) experience.end = end

    await experience.save()

    return res.status(200).json(experience)
})

router.delete("/:id", async(req, res)=>{
    let id = req.params.id

    let experience = await models.Experience.findOne({
        where: {
            id: id
        }
    })

    if(!experience) return res.status(404).json({message: "Not found"})
    
    await experience.destroy()

    return res.status(204).json({message: "Academic Background deleted"})
})

export default router;