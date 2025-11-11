import { Router } from "express";
import models from "../models/index.js";
const router = Router()

router.get("/", async (req, res)=>{
    let {userId} = req.query

    if(!userId) return res.status(400).json({message: "Invalid parameters"})
    
    let academicBackgrounds = await models.AcademicBackground.findAll({
        where: {
            userId: userId
        }
    })

    return res.status(200).json(academicBackgrounds)
})


router.get("/:id", async (req, res)=>{
    let id = req.params.id

    let academicBackground = await models.AcademicBackground.findOne({
        where: {
            id: id
        }
    })

    if(!academicBackground) return res.status(404).json({message:"Not found"})

    return res.status(200).json(academicBackground)
})

router.put("/:id", async (req, res)=>{
    let id = req.params.id

    let academicBackground = await models.AcademicBackground.findOne({
        where: {
            id: id
        }
    })

    if(!academicBackground) return res.status(404).json({message: "Not found"})
    
    let {
        courseName,
        institution,
        start,
        end,
    } = req.body
    let {userId} = req.query

    if(!courseName || !institution || !start || !end || !userId) return res.status(400).json({message: "Invalid parameters"})
    
    academicBackground.courseName = courseName
    academicBackground.institution = institution
    academicBackground.start = start
    academicBackground.end = end

    await academicBackground.save()

    return res.status(200).json(academicBackground)
})

router.delete("/:id", async(req, res)=>{
    let id = req.params.id

    let academicBackground = await models.AcademicBackground.findOne({
        where: {
            id: id
        }
    })

    if(!academicBackground) return res.status(404).json({message: "Not found"})
    
    await academicBackground.destroy()

    return res.status(204).json({message: "Academic Background deleted"})
})

export default router;