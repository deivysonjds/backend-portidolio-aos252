import { Router } from "express";
import models from "../models/index.js";
const router = Router()

router.post("/", async (req, res)=>{
    let {userId} = req.query

    let {
        name, 
        description
    } = req.body

    if(!name || !description || !userId) return res.status(400).json({message: "Invalid parameters"})

    let project = await models.Projects.create({
        name: name,
        description: description,
        userId: userId
    })

    return res.status(201).json(project)
})

router.get("/", async (req, res)=>{
    let {userId} = req.query

    // if(!userId) return res.status(400).json({message: "Invalid parameters"})
    
    let projects = await models.Projects.findAll({
        where: {
            userId: userId
        }
    })

    return res.status(200).json(projects)
})

router.get("/:id", async (req, res)=>{
    let id = req.params.id

    let project = await models.Projects.findOne({
        where: {
            id: id
        }
    })

    if(!project) return res.status(404).json({message:"Not found"})

    return res.status(200).json(project)
})

router.put("/:id", async (req, res)=>{
    let id = req.params.id

    let project = await models.Projects.findOne({
        where: {
            id: id
        }
    })

    if(!project) return res.status(404).json({message: "Not found"})
    
    let {
        name,
        description
    } = req.body

    if(!description || !name ) return res.status(400).json({message: "Invalid parameters"})
    
    project.description = description
    project.name = name

    await project.save()

    return res.status(200).json(project)
})

router.delete("/:id", async(req, res)=>{
    let id = req.params.id

    let project = await models.Projects.findOne({
        where: {
            id: id
        }
    })

    if(!project) return res.status(404).json({message: "Not found"})
    
    await project.destroy()

    return res.status(204).json({message: "Project deleted"})
})

export default router;