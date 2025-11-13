import models from "../models/index.js";

export default async function seedInDataBase(){

    let user1 = await models.User.create({
        name: "Deivyson José da Silva",
        email: "dev.deivyson@gmail.com",
        contact: "81988993441",
        linkedin: "https://www.linkedin.com/in/deivyson-silva-218b84297/",
        github: "https://github.com/deivysonjds",
        website: "https://deivyson-silva.vercel.app/"
    })

    await models.AcademicBackground.create({
        courseName: "Sistema para internet",
        institution: "Unicap",
        start: new Date(2024, 2, 1),
        end: new Date(2026, 6, 1),
        userId: user1.id
    })

    await models.Experience.create({
        position: "Op. negociação financeira",
        enterprise: "Ser Educacional",
        description: "Atividades ligadas a recuperação de crédito e automações web",
        start: new Date(2020, 11, 21),
        current: true,
        userId: user1.id
    })

    await models.Projects.create({
        name: "Bot whatsapp",
        description: "Sistema que envia mensagens pelo whatsapp para clientes a partir de uma planilha. Tecnologias: node.js, electron, whatsapp-web-js, back4app",
        userId: user1.id
    })
    
    await models.Projects.create({
        name: "Automação web",
        description: "Automação para formalização de acordos e envio dos dados e boletos por e-mail pela intranet da empresa. Tecnologias: Python, selenium, openpyxl, pywin32, back4app",
        userId: user1.id
    })
    
    await models.Projects.create({
        name: "Website de vendas de carros seminovos",
        description: "Sistema para empresa de venda de carros seminovos, onde é possível registrar e manipular dados de carros e clientes. tecnologias usadas: Java ( Spring boot ), React.js",
        userId: user1.id
    })

    let hardskill1 = await models.HardSkills.create({name: "node.js"})
    let hardskill2 = await models.HardSkills.create({name: "spring boot"})
    let hardskill3 = await models.HardSkills.create({name: "ASP.NET"})
    let hardskill4 = await models.HardSkills.create({name: "javascript"})
    let hardskill5 = await models.HardSkills.create({name: "typescript"})
    let hardskill6 = await models.HardSkills.create({name: "java"})
    let hardskill7 = await models.HardSkills.create({name: "C#"})

    await user1.addHardSkill([hardskill1, hardskill2, hardskill3, hardskill4, hardskill5, hardskill6, hardskill7])

    let softSkills1 = await models.SoftSkills.create({description: "ótima comunicação"})
    let softSkills2 = await models.SoftSkills.create({description: "Senso crítico"})
    let softSkills3 = await models.SoftSkills.create({description: "alta capacidade de aprendizado"})

    await user1.addSoftSkill([softSkills1, softSkills2, softSkills3])
}