const express  = require("express")
const { PrismaClient } = require("@prisma/client")
const app = express()
const prisma = new PrismaClient();

app.use(express.json())
//CREATE A USER
app.post("/users", async (req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    }
    const newUser = await prisma.user.create({ data: data })
    res.status(200).json({
        success: true,
        status: "OK",
        message: "User has been Successfully registered",
        data: newUser
    })
})

//GET ALL USERS
app.get("/users", async (req, res) => {
    const user = await prisma.user.findMany()
    res.status(200).json(user)
})

//GET A USER
app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    const user = await prisma.user.findFirst({ where: { id: parseInt(id) }})
    res.status(200).json(user)
})

//UPDATE A USER
app.put("/users/:id", async (req, res) => {
    const id = req.params.id
    const updateUser = await prisma.user.update({ where: { id: parseInt(id) }, data: req.body})
    res.status(200).json({
        success: true,
        status: "OK",
        message: "User Information has been successfully updated",
        data: updateUser
    })
})

//DELETE A USER
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    await prisma.user.delete({ where: { id: parseInt(id) }})
    res.status(200).json({
        success: true,
        status: "OK",
        message: "User Information has been successfully deleted"
    })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is currently running on port ${PORT}`);
})