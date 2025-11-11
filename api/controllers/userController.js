import { Router } from "express";
import models from "../models/index.js";
const router = Router()

router.post("/", async (req, res)=>{

    let {
        name,
        email,
        contact,
        linkedin,
        github,
        website,
        academic_background,
        experience,
        hardskill,
        softskill
    } = req.body

    if(!name || !email || !contact) return res.status(400).json({message: "Invalid parameters"})
    
    let user = await models.User.create({
        name: name,
        email: email,
        contact: contact,
        linkedin: linkedin,
        github: github,
        website: website,
        academic_background: academic_background,
        experience: experience,
        softSkill: softskill,
        hardSkill: hardskill
    },
    {
        include: [
            {model: models.Experience, as: "experience"},
            {model: models.AcademicBackground, as: "academic_background"},
            {model: models.HardSkills, as: "HardSkill"},
            {model: models.SoftSkills, as: "SoftSkill"}
        ]
    })
    return res.status(201).json(user)
})

router.get("/", async (req, res)=>{
    let users = await models.User.findAll({
        include: [{all: true, nested: true}]
    })

    return res.status(200).json(users)
})

router.get("/:id", async (req, res)=>{
    let id = req.params.id

    let user = await models.User.findOne({
        where: {
            id: id
        },
        include: [{all: true, nested: true}]
    })

    if(!user) return res.status(404).json({message:"Not found"})

    return res.status(200).json(user)
})

router.put("/:id", async (req, res)=>{
    let id = req.params.id

    let user = await models.User.findOne({
        where: {
            id: id
        }
    })

    if(!user) return res.status(404).json({message: "Not found"})
    
    let {name,
        email,
        contact,
        linkedin,
        github,
        website
    } = req.body

    if(!name || !email || !contact) return res.status(400).json({message: "Invalid parameters"})
    
    user.name = name
    user.email = email
    user.contact = contact
    if(!!linkedin) user.linkedin = linkedin
    if(!!github) user.github = github
    if(!!website) user.website = website

    await user.save()

    return res.status(200).json(user)
})

router.delete("/:id", async(req, res)=>{
    let id = req.params.id

    let user = await models.User.findOne({
        where: {
            id: id
        }
    })

    if(!user) return res.status(404).json({message: "Not found"})
    
    await user.destroy()

    return res.status(204).json({message: "User deleted"})
})

export default router;