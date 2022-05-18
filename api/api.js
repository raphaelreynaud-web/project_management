const {Router} = require("express")
const router = Router()

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', (req,res) => {
    res.send("Home of Project Management API")
})
// Projects basics
router.get('/projectlist', async (req,res) => {
    const list = await prisma.projet.findMany({
        select : {
            id : true,
            name : true
        }
    })
    res.status(200).json(list)
})

router.get('/allprojects', async (req,res) => {
    const projects = await prisma.projet.findMany({})
    res.status(200).json(projects)
})

router.get('/project/:id', async (req,res) => {
    const project = await prisma.projet.findMany({
        where : {
            id : req.params.id
        },
        include : {
            groupes : {
                include : {
                    todos : true
                }
            },
        }
    })
    res.status(200).json(project)
})

router.get("/projects/:name", async (req, res) => {
    const projects = await prisma.projet.findMany({
        where : {
            name : {
                contains : req.params.name
            }
        }
    })
    res.status(200).json(projects)
})
// Create routes
router.post('/createproject', async (req,res) => {
    const project = await prisma.projet.create({
        data : {
            name : req.body.name,
            description : req.body.description
        }
    })
    res.status(200).send("Project created")
})

router.post('/creategroupe', async (req,res) => {
    const groupe = await prisma.groupe.create({
        data : {
            name : req.body.name,
            project_id : req.body.project_id
        }
    })
    res.status(200).send("Groupe created")
})

router.post('/createtodo', async (req,res) => {
    const Todo = await prisma.todo.create({
        data : {
            name : req.body.name,
            groupe_id : req.body.groupe_id,
            statut : req.body.statut
        }
    })
    res.status(200).send("Todo created")
})

// Update Routes
router.post('/updatestatut', async (req,res) => {
    const statut = await prisma.todo.update({
        where : {
            id : req.body.id
        },
        data : {
            statut : req.body.statut
        }
    })
    res.status(200).send("Statut updated")
})

router.post('/updatestart', async (req,res) => {
    const start_date = await prisma.todo.update({
        where : {
            id : req.body.id
        },
        data : {
            start_date : req.body.start_date
        }
    })
    res.status(200).send("Start date updated")
})
router.post('/updateend', async (req,res) => {
    const end_date = await prisma.todo.update({
        where : {
            id : req.body.id
        },
        data : {
            end_date : req.body.end_date
        }
    })
    res.status(200).send("End date updated")
})
router.post('/updatedescription', async (req,res) => {
    const description = await prisma.projet.update({
        where : {
            id : req.body.id
        },
        data : {
            description : req.body.description
        }
    })
    res.status(200).send("Description updated")
})
// Change Name Routes
router.post('/updatetodoname', async (req,res) => {
    const todo = await prisma.todo.update({
        where : {
            id : req.body.id
        },
        data : {
            name : req.body.name
        }
    })
    res.status(200).send("Todo name updated")
})

router.post('/updateprojectname', async (req,res) => {
    const project = await prisma.projet.update({
        where : {
            id : req.body.id
        },
        data : {
            name : req.body.name
        }
    })
    res.status(200).send("Project name updated")
})

router.post('/updategroupename', async (req,res) => {
    const groupe = await prisma.groupe.update({
        where : {
            id : req.body.id
        },
        data : {
            name : req.body.name
        }
    })
    res.status(200).send("Groupe name updated")
})
// Delete routes
router.post('/deletetodo', async (req,res) => {
    const todo = await prisma.todo.delete({
        where : {
            id : req.body.id
        }
    })
    res.status(200).send("Todo deleted")
})
router.post('/deletegroupe', async (req,res) => {
    const groupe = await prisma.groupe.delete({
        where : {
            id : req.body.id
        }
    })
    res.status(200).send("Groupe deleted")
})
router.post('/deleteproject', async (req,res) => {
    const project = await prisma.projet.delete({
        where : {
            id : req.body.id
        }
    })
    res.status(200).send("Project deleted")
})


module.exports = router